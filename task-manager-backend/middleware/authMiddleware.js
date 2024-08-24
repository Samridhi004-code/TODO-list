const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/User');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, 'your_jwt_secret', async (err, user) => {
        if (err) return res.status(403).send('Invalid Token');

        // Optional: Verify user exists
        const foundUser = await findUserById(user.id);
        if (!foundUser) return res.status(401).send('User not found');

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
