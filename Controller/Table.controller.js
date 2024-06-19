// import datajson from './table.json'

let datajson=require("./table.json")
let SignupdataCollection = require('../Model/Table.model');
let DummyApiCollection = require('../Model/String.model');


let addTableData = async (req, res) => {

    let { data } = req.body;
    try {

        console.log(req.body)

        // Insert the new documents from req.body
        let document = await SignupdataCollection.find({})
        let newTableData;

            newTableData = await SignupdataCollection.deleteMany({});

               await SignupdataCollection.create(req.body);

        console.log(data);
        res.status(201).send({ message: 'Data saved successfully', data: newTableData });
    } catch (err) {
        console.error("Error adding data:", err);
        res.status(500).json({ error: true, message: "Failed to add data", data: { "name": '', "city": '' } });
    }
}


let getTableData = async (req, res) => { 
    try {
        // Fetch all documents from the collection
        let dataExist=await SignupdataCollection.find();
        // if(!dataExist)
        //     {
        //         res.json({data:{name:"",city:""}});
        //     }
        // else{     
        // }
        let tableData = await SignupdataCollection.find().select('-__v');
        res.json({data:tableData});

    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: true, message: "Failed to fetch data" });
    }
}

let addDummyData = async (req, res) => {

    let { data } = req.body;
    try {

        console.log(req.body)

        // Insert the new documents from req.body
        let document = await DummyApiCollection.find({})
        let newTableData;

            newTableData = await DummyApiCollection.deleteMany({});

               await DummyApiCollection.create(req.body);

        console.log(data);
        res.status(201).send({ message: 'Data saved successfully', data: newTableData });
    } catch (err) {
        console.error("Error adding data:", err);
        res.status(500).json({ error: true, message: "Failed to add data", data: { "name": '', "city": '' } });
    }
}


let getDummyData = async (req, res) => { 
    try {
        // Fetch all documents from the collection
        let dataExist=await DummyApiCollection.find();
        // if(!dataExist)
        //     {
        //         res.json({data:{name:"",city:""}});
        //     }
        // else{
         
        // }
        let tableData = await DummyApiCollection.find().select('-__v');
        res.json({data:tableData});

    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: true, message: "Failed to fetch data" });
    }
}



module.exports = { addTableData, getTableData ,addDummyData,getDummyData};
