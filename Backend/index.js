const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const api = require('./Routes/api');
const newpost=require('./Routes/newpost')
const newbid=require('./Routes/newbid')


const interest=require('./Routes/interest');
const profile  = require('./Routes/profile');
const dotenv = require('dotenv');



dotenv.config();

const app = express();

// Connect to database
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api', api);
app.use('/newpost',newpost)
app.use('/profile',profile)

app.use('/newbid',newbid)



// app.use('/interest',interest)

const port = 3000
app.listen(port)