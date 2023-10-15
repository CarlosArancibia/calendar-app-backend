const express = require('express');
const { connectDB } = require('./db/config');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// enable DB connection
connectDB();

// CORS
app.use(cors());

// public directory
app.use(express.static('public'));

// parse request to json
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(port, () => console.log(`Server running on: http://localhost:${port}`));
