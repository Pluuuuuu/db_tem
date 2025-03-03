const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Open SQLite database
const db = new sqlite3.Database('./finance-tracker.db');

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to Finance Tracker!');
});

// Importing the routes
const analysisRoutes = require('./routes/analysisRoutes');
const incomeRoutes = require('./routes/incomeRoutes');

// Use the routes for each page
app.use(analysisRoutes); // This will serve any routes defined in analysisRoutes.js
app.use(incomeRoutes);   // This will serve any routes defined in incomeRoutes.js

// Listen to the port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
