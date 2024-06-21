const express = require('express');

const { addTableData,getTableData,getDummyData,addDummyData,addFormStructre,getFormStructre,addFormData,getFormData} = require('../Controller/Table.controller');

let router = express.Router();


router.post('/addTableData', addTableData);
router.get('/getTableData', getTableData);
router.post('/addDummyData', addDummyData);
router.get('/getDummyData', getDummyData);
router.post('/addFormStructre', addFormStructre);
router.get('/getFormStructre', getFormStructre);
router.post('/addFormData', addFormData);
router.get('/getFormData', getFormData);


module.exports = router; 