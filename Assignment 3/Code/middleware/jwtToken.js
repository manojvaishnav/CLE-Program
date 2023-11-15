const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        req.user = decoded;
        next();
    });
};
