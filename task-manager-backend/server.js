const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeDb } = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Database
initializeDb();

// // Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
