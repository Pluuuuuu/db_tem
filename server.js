require("dotenv").config();
const DB_PATH = process.env.DB_PATH || "./finance-tracker.db";


const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
    } else {
      console.log("Connected to SQLite database:", DB_PATH);
    }
  });


const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Open SQLite database
const db = new sqlite3.Database('./finance-tracker.db');

// Middleware
app.use(express.json()); // Parse JSON body
app.use(logger); // Log requests


// Test route
app.get('/', (req, res) => {
    res.send('Welcome to Finance Tracker!');
});

// Importing the routes
const analysisRoutes = require('./routes/analysisRoutes');
const incomeRoutes = require('./routes/incomeRoutes');

// Use the routes for each page
app.use("/income", incomeRoutes);
app.use("/analysis", analysisRoutes);

//i changed: app.use(incomeRoutes);   // This will serve any routes defined in incomeRoutes.js

//Always use path prefixes ("/income", "/analysis") to avoid route conflicts and improve code organization.


// Error Handling Middleware
app.use(errorHandler);


// Listen to the port

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/*
why second method is better:
Checks if an environment variable (process.env.PORT) is set.
If no environment variable is set, it defaults to port 5000.
This is useful for deployment, as hosting platforms (e.g., Heroku, Vercel) assign ports dynamically.
Best Practice: Always use process.env.PORT || 5000 for flexibility and production readiness. 

*/
/*
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
 */