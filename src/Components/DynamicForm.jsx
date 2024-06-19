import React from 'react';

const DynamicForm = ({ formData, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSubmit(); // Call the provided onSubmit function
  };

  return (
    <form style={formContainerStyle} onSubmit={handleSubmit}>
      {formData.map((field, index) => (
        <div key={index}>
          {field.type === 'text' && (
            <input style={formInputStyle} type="text" name={field.name} placeholder={field.placeholder} />
          )}
          {field.type === 'email' && (
            <input style={formInputStyle} type="email" name={field.name} placeholder={field.placeholder} />
          )}
          {field.type === 'password' && (
            <input style={formInputStyle} type="password" name={field.name} placeholder={field.placeholder} />
          )}
          {field.type === 'textarea' && (
            <textarea style={formInputStyle} name={field.name} placeholder={field.placeholder} />
          )}
          {field.type === 'checkbox' && (
            <input style={formInputStyle} type="checkbox" name={field.name} />
          )}
          {field.type === 'dropdown' && (
            <select style={formInputStyle} name={field.name}>
              {field.options.map((option, i) => (
                <option key={i} value={option.value}>{option.label}</option>
              ))}
            </select>
          )}
          <div>
            {field.type === 'button' && (
              <button style={formButtonStyle} type="button" onClick={field.onClick}>
                {field.label}
              </button>
            )}
            {field.type === 'submit' && (
              <button style={formButtonStyle} type="submit">
                {field.label}
              </button>
            )}
          </div>
          {/* Add more input types as needed */}
        </div>
      ))}
    </form>
  );
};

export default DynamicForm;

// CSS styles as JavaScript objects
const formContainerStyle = {
  maxWidth: '400px', // Adjust the width as needed
  margin: '0 auto',
  marginTop: '5px'
};

const formInputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxSizing: 'border-box'
};

const formButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff', // Change to your desired button color
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '2px'
};

// Style for button hover effect
formButtonStyle[':hover'] = {
  backgroundColor: '#0056b3' // Change to a darker shade of your button color
};
