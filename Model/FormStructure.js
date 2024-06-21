const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');


const FormStrucutreSchema = new Schema({}, { strict: false });



// ! collection 

module.exports=model('FormStrucutre',FormStrucutreSchema) 