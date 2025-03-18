const { sql, poolPromise } = require('../config/db');

exports.getUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};