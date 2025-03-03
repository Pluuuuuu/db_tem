const express = require('express');
const router = express.Router();

const analysisController = require("../controllers/analysisController");
const authenticate = require("../middleware/authMiddleware");

router.get("/total-income", authenticate, analysisController.getTotalIncome);
router.get("/income-category", authenticate, analysisController.getIncomeByCategory);
router.get("/monthly-income", authenticate, analysisController.getMonthlyIncome);


module.exports = router;
