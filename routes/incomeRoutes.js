const express = require('express');
const router = express.Router();

// Example route for income page
router.get('/income', (req, res) => {
  // Add your income logic here
  res.send('Income Page');
});

module.exports = router;
