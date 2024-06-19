const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');


const TableDataSchema = new Schema({}, { strict: false });



// ! collection 

module.exports=model('DummyApi',TableDataSchema)  