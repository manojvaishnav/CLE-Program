const User = require("../models/UserModel");
const { createToken } = require("../config/CreateToken");
const maxAge = 7 * 24 * 60 * 60 * 1000; //7 days in milisecond

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
        const isUserExists = await User.findOne({ email });
        if (!isUserExists) {
            const data = new User({
                name,
                email,
                password,
                mobile,
            });
            await data
                .save()
                .then(async (result) => {
                    const token = await createToken(result._id);
                    res.cookie("authToken", token, { maxAge, httpOnly: true });
                    res.status(200).json({
                        message: "Registration Successfully",
                        result
                    });
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err.message);
                });
        } else {
            res.status(400).json({ error: "User already exists" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUserExists = await User.findOne({ email });
        if (isUserExists && (await isUserExists.matchPassword(password))) {
            const token = await createToken(isUserExists._id);
            res.cookie("authToken", token, { maxAge, httpOnly: true });
            res
                .status(200)
                .json({ message: "Login successfully", isUserExists });
        } else {
            res.status(400).json({ error: "Email and password are invalid" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("authToken");
        res.locals.userId = null;
        res.status(200).json({
            message: "Logout Successfully",
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};


module.exports.getUserDetail = async (req, res, next) => {
    try {
        const userId = res.locals.userId;
        await User.findById({ _id: userId }, { password: 0 })
            .then((result) => {
                res.status(200).json({ result });
            })
            .catch((err) => {
                res.status(400).json({ error: err.message });
            });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
