const express = require('express');

const { addTableData,getTableData,getDummyData,addDummyData} = require('../Controller/Table.controller');

let router = express.Router();


router.post('/addTableData', addTableData);
router.get('/getTableData', getTableData);
router.post('/addDummyData', addDummyData);
router.get('/getDummyData', getDummyData);


module.exports = router; 