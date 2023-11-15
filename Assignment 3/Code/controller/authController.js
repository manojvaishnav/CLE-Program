const db = require('../database/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        const token = jwt.sign({ id: result.insertId, username: username }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }

        const token = jwt.sign({ id: user.user_id, username: user.username }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Login Successfully", token });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

module.exports.checkUser = async (req, res) => {
    try {
        const { user } = req;
        res.status(200).json({ message: "User verified", user })
    } catch (error) {
        console.log("user verification error", error)
        res.status(401).json({ error: "verification failed" })
    }
}