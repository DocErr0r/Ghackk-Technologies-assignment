const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const webtoonRoutes = require('./routes/webtoonRoute.js');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/webtoons').then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// API routes
app.use('/api', webtoonRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
