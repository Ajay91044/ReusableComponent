const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');


const FormDataSchema = new Schema({}, { strict: false });



// ! collection 

module.exports=model('Form',FormDataSchema) 