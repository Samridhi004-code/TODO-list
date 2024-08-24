const { db } = require('../config/db');

const createUser = (username, password) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID });
        });
    });
};

const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Users WHERE username = ?', [username], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Users WHERE id = ?', [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

module.exports = { createUser, findUserByUsername, findUserById };
