const Token = require("../models/Token");

async function authenticator(req, res, next) {
    try {
        const userToken = req.headers["authorization"];
        if (!userToken) throw new Error("User not authenticated.");
        const validToken = await Token.getOneByToken(userToken);
        req.body["user_id"] = validToken.user_id;
        console.log(req.body);
        next();
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
}

module.exports = authenticator