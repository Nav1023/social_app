const express = require('express');
const bodyParser = require('body-parser');
const socialRoute = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

const connectToDB = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'));
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('Error while conencting to DB', error.message);
  }
}


const app = express();
connectToDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/social', socialRoute);


app.listen(9000, () =>{
  console.log('Server started on port 9000');
})
