const bcrypt = require("bcrypt");

const User = require("../models/User");
const Token = require("../models/Token");
const Complaint = require("../models/Complaint");

async function register(req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        data["password"] = await bcrypt.hash(data["password"], salt);
        const result = await User.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    const data = req.body;
    try {
        const user = await User.getOneByUsername(data.username);
        const authenticated = await bcrypt.compare(
            data.password,
            user["password"]
        );
        if (!authenticated) throw new Error("Incorrect credentials.");
        const token = await Token.create(user.id);
        res.status(200).json({ authenticated: true, token: token.token });
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
}
async function logout(req, res) {
    const data = req.body;
    try {
        const token = await Token.getOneByToken(data.token);
        if (!token) throw new Error("Invalid token.");
        const result = await token.destroy();
        res.status(200).json(result);
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
}
async function deleteComplaint(req, res) {
    const data = req.body;
    try {
        const user = await User.getOneByUsername(data.username);
        const complaint_post = await Complaint.getOneById(data.postID);
        if (user.admin == false || user.id != complaint_post.user_id) throw new Error("Insufficient permissions!");
        const result = await complaint_post.destroy();
        res.status(200).json(result);
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
}

module.exports = {
    register,
    login,
    logout,
    deletePost: deleteComplaint,
};
