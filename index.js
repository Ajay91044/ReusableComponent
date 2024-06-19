const express = require('express');
const mongoose = require('mongoose');
const connectToMongoDb = require('./db/connection');
const TableDataRoutes = require('./Routes/table.routes');
const model = require('./Model/Table.model');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/tabledatas', TableDataRoutes);

const startServer = async () => {
  try {
    await connectToMongoDb(process.env.DEV_MONGO_URL); // Ensure the correct reference here
    console.log('MongoDB connected successfully');

    app.listen(process.env.DEV_PORT, () => {
      console.log(`Server is running on port ${process.env.DEV_PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer(); 
