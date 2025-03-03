const express = require('express');
const router = express.Router();

const incomeController = require("../controllers/incomeController");
const authenticate = require("../middleware/authMiddleware"); // Ensure only authorized users can access


router.get("/", authenticate, incomeController.getIncome);
router.post("/", authenticate, incomeController.addIncome);
router.delete("/:id", authenticate, incomeController.deleteIncome);

module.exports = router;
