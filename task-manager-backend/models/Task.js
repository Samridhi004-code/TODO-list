const { db } = require('../config/db');

const createTask = (title, description, status, userId) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO Tasks (title, description, status, userId) VALUES (?, ?, ?, ?)', [title, description, status, userId], function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID });
        });
    });
};

const getTasks = (userId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Tasks WHERE userId = ? LIMIT ? OFFSET ?', [userId, limit, offset], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const updateTask = (id, title, description, status) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE Tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id], function (err) {
            if (err) reject(err);
            else resolve({ changes: this.changes });
        });
    });
};

const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM Tasks WHERE id = ?', [id], function (err) {
            if (err) reject(err);
            else resolve({ changes: this.changes });
        });
    });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
