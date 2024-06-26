// import datajson from './table.json'

let datajson = require("./table.json")
let SignupdataCollection = require('../Model/Table.model');
let DummyApiCollection = require('../Model/String.model');
let FormDataCollection = require('../Model/Form.model');
let FormStructureCollection = require('../Model/FormStructure');

let arraylist=[

{"_id":"SiteBO:RITS",
"site":"RITS",  
"description":
"RITS",
"type":
"Production"
},

{"_id": "SiteBO:EXIDE",
    "site":"EXIDE",
    "description": "EXIDE",
    "type":"Production"
    },
    {"_id": "SiteBO:Himalaya",
        "site":"Himalaya",
        "description": "Himalaya",
        "type":"Production"
        },

]
let colummnChart=
[
    { "name": "Category A", "value": 400 },
    { "name": "Category B", "value": 300 },
    { "name": "Category C", "value": 200 },
    { "name": "Category D", "value": 500 },
    { "name": "Category E", "value": 600 }
  ]
  
let graphData=[
    { "time": "2024-06-01", "value": 110 },
    { "time": "2024-06-02", "value": 75 },
    { "time": "2024-06-03", "value": 20 },
    { "time": "2024-06-04", "value": 18 },
    { "time": "2024-06-05", "value": 25 }
  ]
   

  let pieData=[
    {
      "name": "Red",
      "value": 20,
      "color": "#FF6384"
    },
    {
      "name": "Blue",
      "value": 30,
      "color": "#36A2EB"
    },
    {
      "name": "Yellow",
      "value": 10,
      "color": "#FFCE56"
    },
    {
      "name": "Green",
      "value": 40,
      "color": "#4CAF50"
    }
  ]
  

let addTableData = async (req, res) => {
    let formState = req.body;
    console.log(formState);

    try {
        // Check if formState is an array
        if (Array.isArray(formState)) {
            // Delete all documents and insert the new array of documents
            await SignupdataCollection.deleteMany({});
            let newTableData = await SignupdataCollection.create(formState);
            res.status(201).send({ message: 'Data saved successfully', data: newTableData });
        } else if (typeof formState === 'object' && formState !== null) {
            // Update the document if formState is an object
            let updatedDocument = await SignupdataCollection.updateOne({ _id: formState._id }, { $set: formState });
            res.status(201).send({ message: 'Data updated successfully', data: updatedDocument });
        } else {
            res.status(400).send({ message: 'Invalid data format' });
        }
    } catch (err) {
        console.error("Error adding data:", err);
        res.status(500).json({ error: true, message: "Failed to add data", data: { "name": '', "city": '' } });
    }
}

let getTableData = async (req, res) => {
    try {
        // Fetch all documents from the collection
        let dataExist = await SignupdataCollection.find();
        // if(!dataExist)
        //     {
        //         res.json({data:{name:"",city:""}});
        //     }
        // else{     
        // }
        let tableData = await SignupdataCollection.find().select('-__v');
        res.json({ data: tableData });

    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: true, message: "Failed to fetch data" });
    }
}

let addDummyData = async (req, res) => {

    let formState = req.body;
    console.log(formState);

    try {
        // Check if formState is an array
        // Delete all documents and insert the new array of documents

        await DummyApiCollection.deleteMany({});
        let newTableData = await DummyApiCollection.create(formState);
        // res.status(201).send({ message: 'Data updated successfully', data: updatedDocument });
        let UpdatedNewTableData = await DummyApiCollection.find({});
        res.status(201).send({ message: 'Data saved successfully', data: UpdatedNewTableData });



    }
    catch (err) {
        console.error("Error adding data:", err);
        res.status(500).json({ error: true, message: "Failed to add data", data: { "name": '', "city": '' } });
    }
}


let getDummyData = async (req, res) => {
    try {
        // Fetch all documents from the collection
        let dataExist = await DummyApiCollection.find(); 
        // if(!dataExist)
        //     {
        //         res.json({data:{name:"",city:""}});
        //     }
        // else{

        // }
        let tableData = await DummyApiCollection.find().select('-__v');
            res.json({ data: tableData });
        
       

    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: true, message: "Failed to fetch data" });
    }
}
const addFormStructre = async (req, res) => {
    // let formState = req.body;
    try {
        // console.log(formState);
        // Check if any document exists in the collection
        let document = await FormStructureCollection.findOne({});
        if (document) {
            // console.log(document.formData);
            // Update the existing document's formData field with formState
            let deleteddoucments = await FormStructureCollection.deleteMany({});
            let postresponse = await FormStructureCollection.create(req.body);

        } else {
            // Create a new document with the provided formState
            // await FormDataCollection.create({ formData: formState });
        }

        res.status(201).send({ message: 'Data saved successfully' });
    } catch (err) {
        console.error("Error adding data:", err);
        res.status(500).json({ error: true, message: "Failed to add data" });
    }
};

let getFormStructre = async (req, res) => {
    try {
        // Fetch all documents from the collection
        let dataExist = await FormStructureCollection.find();
        // if(!dataExist)
        //     {
        //         res.json({data:{name:"",city:""}});
        //     }
        // else{

        // }
        let formStrucute = await FormStructureCollection.find().select('-__v');
        // res.json({ data: arraylist });
        // res.json({ data: colummnChart });
        res.json({ colummnChart: colummnChart ,pieData:pieData,graphData:graphData});
        
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: true, message: "Failed to fetch data" });
    }
}

// ! 
const addFormData = async (req, res) => {

    let formState = req.body;
    try {
        console.log(formState);
        // Check if any document exists in the collection
        // let document = await FormDataCollection.deleteMany({});
        let document = await FormDataCollection.findOne({});
        console.log(document)
        await FormDataCollection.deleteMany({});
        await FormDataCollection.create(req.body);
        if (document) {
            // Update the existing document's formData field with formState

        } else {
            // Create a new document with the provided formState
            // await FormDataCollection.create({ formData: formState });
        }

        res.status(201).send({ message: 'Data saved successfully', data: formState });
    } catch (err) {
        console.error("Error adding data:", err);
        res.status(500).json({ error: true, message: "Failed to add data", data: { "name": '', "city": '' } });
    }
};

let getFormData = async (req, res) => {

    try {
        // Fetch all documents from the collection
        let dataExist = await FormDataCollection.find();
        // if(!dataExist)
        //     {
        //         res.json({data:{name:"",city:""}});
        //     }
        // else{

        // }
        let formData = await FormDataCollection.find().select('-__v');
        res.json({ data: formData });

    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: true, message: "Failed to fetch data" });
    }
}



module.exports = { addTableData, getTableData, addDummyData, getDummyData, addFormStructre, getFormStructre, addFormData, getFormData };
