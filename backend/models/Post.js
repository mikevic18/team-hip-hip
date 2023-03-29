const db = require("../database/connect");

class Post {
    constructor({
        post_id,
        user_id,
        title,
        content,
        votes,
        creation_date,
        update_date,
        category
    }) {
        this.id = post_id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.votes = votes;
        this.creation_date = creation_date;
        this.update_date = update_date;
        this.category = category
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM posts;"
        );
        if (response.rows.length == 0) throw new Error("No posts have been found.");
        return response.rows.map((p) => new Post(p));
    }

    static async getByRecent() {
        const response = await db.query(
            "SELECT * FROM posts ORDER BY update_date DESC;"
        );
        if (response.rows.length < 1) throw new Error("Unable to locate posts.");
        return response.rows.map((p) => new Post(p));
    }

    static async getByVotes() {
        const response = await db.query("SELECT * FROM posts ORDER BY votes DESC;");
        if (response.rows.length < 1) throw new Error("Unable to locate posts.");
        return response.rows.map((p) => new Post(p));
    }

    static async getAllOfCategory(category) {
        const response = await db.query(
            `SELECT * FROM ${category};`
        );
        if (response.rows.length == 0) throw new Error(`No ${category} have been found.`);
        return response.rows.map((p) => new Post(p))
    }

    static async getAllOfCategoryByRecent(category) {
        const response = await db.query(
            `SELECT * FROM ${category} ORDER BY update_date DESC;`
        );
        if (response.rows.length < 1) throw new Error(`Unable to locate ${category}.`);
        return response.rows.map((p) => new Post(p));
    }

    static async getAllOfCategoryByVotes(category) {
        const response = await db.query(
            `SELECT * FROM ${category} ORDER BY votes DESC;`
        );
        if (response.rows.length < 1) throw new Error(`Unable to locate ${category}.`);
        return response.rows.map((p) => new Post(p));
        }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM posts WHERE post_id = $1;",
            [id]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to locate post.");
        return new Post(response.rows[0]);
    }

    static async create(data) {
        data.user_id = data.user_id || 1;
        const now = new Date()
        const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');
        const response = await db.query(
            `INSERT INTO ${data.category} (user_id, title, content, category, creation_date, update_date) VALUES ($1, $2, $3, $4, $5, $5) RETURNING *;`,
            [data.user_id, data.title, data.content, data.category, timestamp]
        );
        return new Post(response.rows[0]);
    }

    async update(data) {
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');
        const response = await db.query(
            "UPDATE posts SET title = $2, content = $3, update_date = $4 WHERE post_id = $1 RETURNING *;",
            [this.id, data.title, data.content, timestamp]
        );
        if (response.rows.length != 1) {
            throw new Error("Unable to update post.");
        };
        return new Post(response.rows[0]);
    }

    async updateVotes(data) {
        const response = await db.query(
            "UPDATE posts SET votes = $1 WHERE post_id = $2 RETURNING *;",
            [this.votes + data.votes, this.id]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to update votes.");
        return new Post(response.rows[0]);
    }

    async destroy() {
        const response = await db.query(
            "DELETE FROM posts WHERE post_id = $1 RETURNING *;",
            [this.id]
        );
        return new Post(response.rows[0]);
    }
}

module.exports = Post;
