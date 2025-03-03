// controllers/incomeController.js
const db = require("../config/database"); // Import SQLite connection

// GET all income entries
exports.getIncome = (req, res) => {
    db.all("SELECT * FROM income", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// POST a new income entry
exports.addIncome = (req, res) => {
    const { title, amount, category, date } = req.body;
    
    if (!title || !amount || !category || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO income (title, amount, category, date) VALUES (?, ?, ?, ?)";
    db.run(query, [title, amount, category, date], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Income added", id: this.lastID });
    });
};

// DELETE an income entry
exports.deleteIncome = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM income WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Income deleted" });
    });
};
