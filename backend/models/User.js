const db = require("../database/connect");

class User {
    constructor({ user_id, username, password, admin }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.admin = admin || false;
    }
    static async getUserName(id) {
        const response = await db.query(
            "SELECT username FROM user_account WHERE user_id = $1",
            [id]
        );
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }
    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM user_account WHERE user_id = $1",
            [id]
        );
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async checkIfAdmin(id) {
        const response = await db.query(
            "SELECT admin FROM user_account WHERE user_id = $1",
            [id]
        );
    
        if (response.rows[0].admin == false || response.rows.length != 1)
            return false;
        return true;
    }
    static async getOneByUsername(username) {
        const response = await db.query(
            "SELECT * FROM user_account WHERE username = $1",
            [username]
        );
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, isAdmin } = data;
        let response = await db.query(
            "INSERT INTO user_account (username, password, admin) VALUES ($1, $2, $3) RETURNING user_id;",
            [username, password, isAdmin || false]
        );
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
    async destroy() {
        const response = await db.query(
            "DELETE FROM user_account WHERE username = $1",
            [this.username]
        );
        if (response.rowCount != 1) throw new Error("Unable to locate token.");
        return response;
    }
}

module.exports = User;
