import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { Dialog, DialogContent } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import "./DynamicForm.css"

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DynamicForm({ postApi4, getApi1 }) {
  const [formState, setFormState] = useState({});
  const [formData, setFormData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [browseValue, setBrowseValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getApi1);
        const data = response.data.data[0]; // Assuming you want the first object
  
        console.log(data);
  
        // Convert string values to appropriate types
        const parsedData = {};
        Object.keys(data).forEach(key => {
          const value = data[key];
          if (typeof value === 'string') {
            if (value === 'true' || value === 'false') {
              parsedData[key] = value === 'true';
            } else if (!isNaN(value)) {
              parsedData[key] = parseFloat(value); // Handle numbers
            } else if (Date.parse(value)) {
              parsedData[key] = new Date(value); // Handle dates
            } else {
              parsedData[key] = value; // Keep as string if none of the above
            }
          } else {
            parsedData[key] = value; // If it's not a string, keep as is
          }
        });
  
        // Create form fields based on parsedData
        const fields = Object.keys(parsedData).map(key => ({
          name: key,
          type: typeof parsedData[key] === 'boolean' ? 'switch' : 'input',
          inputType: typeof parsedData[key] === 'number' ? 'number' : 'text' ,
          placeholder: `Enter ${key}`,
        }));
  
        console.log("fields", fields);
        setFormData(fields);
        setFormState(parsedData); // Use parsedData for form state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [getApi1]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formState);
    await axios.post(postApi4, formState);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (name === 'browse') {
      setBrowseValue(value);
    }
  };

  const handleCellClick = (params) => {
    console.log("params", params);
    if (params.field === 'id') {
      setBrowseValue(params.value);
      setFormState({
        ...formState,
        browse: params.value, // assuming the name of the browse input field is 'browse'
      });
      setIsDialogOpen(false);
    }
  };

  const getTable = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box sx={{ height: 300, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onCellClick={handleCellClick}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </DialogContent>
      </Dialog>
     <div className='Form-Container'>
     <form style={formContainerStyle} onSubmit={handleSubmit}>
        {formData.map((field, index) => (
          <div key={index} style={formRowStyle}>
            <div style={formLabelColumnStyle}>
              <label
                style={{ fontSize: '13px', textTransform: 'capitalize', display: 'flex', justifyContent: 'end' }}
                htmlFor={field.name}
              >
                {field.name}:
              </label>
            </div>
            <div style={formInputColumnStyle}>
              
               {field.type === 'input' && (
                <input
                  onChange={handleInputChange}
                  style={formInputStyle}
                  type={field.inputType}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formState[field.name]}
                />
              )}
              {field.type === "switch" && (
                <Switch
                  onChange={(e) => handleInputChange({
                    target: { name: field.name, type: 'checkbox', checked: e.target.checked }
                  })}
                  name={field.name}
                  checked={formState[field.name] || false}
                />
              )}
              {field.type === 'browse' && (
                <div style={browseInputContainerStyle}>
                  <input
                    onChange={handleInputChange}
                    style={formInputStyleWithIcon}
                    type={field.inputType}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={browseValue}
                  />
                  <OpenInNewIcon style={iconStyle} onClick={getTable} />
                </div>
              )}
              {field.type === 'textarea' && (
                <textarea
                  onChange={handleInputChange}
                  style={formInputStyle}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formState[field.name]}
                />
              )}
              {field.type === 'dropdown' && (
                <select
                  style={formInputStyle}
                  name={field.name}
                  onChange={handleInputChange}
                  value={formState[field.name]}
                >
                  {field.options.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

            </div>
          </div>
        ))}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "13px"
        }}>
          <button style={formButtonStyle} type='submit'>
            save
          </button>
          <button style={formButtonStyle} type='reset'>
            cancel
          </button>
        </div>
      </form>
     </div>
    </>
  );
}

export default DynamicForm;

// CSS styles as JavaScript objects
const formContainerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  marginTop: '5px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const formRowStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const formLabelColumnStyle = {
  flex: '1',
  textAlign: 'left',
  paddingRight: '10px',
};

const formInputColumnStyle = {
  flex: '4',
};

const formInputStyle = {
  width: '70%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxSizing: 'border-box',
};

const formButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const browseInputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
};

const formInputStyleWithIcon = {
  ...formInputStyle,
  paddingRight: '30px', // Adjust to make room for the icon
};

const iconStyle = {
  position: 'absolute',
  right: '10px',
  cursor: 'pointer',
};
