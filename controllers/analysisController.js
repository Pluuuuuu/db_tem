// controllers/analysisController.js
const db = require("../config/database"); // Import SQLite connection

// GET total income
exports.getTotalIncome = (req, res) => {
    db.get("SELECT SUM(amount) AS totalIncome FROM income", [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ totalIncome: row.totalIncome || 0 });
    });
};

// GET income by category
exports.getIncomeByCategory = (req, res) => {
    db.all("SELECT category, SUM(amount) AS total FROM income GROUP BY category", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// GET monthly income report
exports.getMonthlyIncome = (req, res) => {
    db.all(
        `SELECT strftime('%Y-%m', date) AS month, SUM(amount) AS total 
         FROM income GROUP BY month ORDER BY month DESC`,
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        }
    );
};
