const db = require("../database/connect");

class Post {
    constructor({
        post_id,
        user_id,
        title,
        content,
        creation_date,
        update_date,
        category
    }) {
        this.id = post_id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
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
            "SELECT * FROM posts ORDER BY creation_date DESC;"
        );
        console.log(response)
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
            `SELECT * FROM ${category} ORDER BY creation_date DESC;`
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
        // const d = new Date(year,month,day,hours,minutes,seconds)
        // const update_date = d.getFullYear;
        const response = await db.query(
            `INSERT INTO ${data.category} (user_id, title, content, category) VALUES ($2, $3, $4, $1) RETURNING *;`,
            [data.category, data.user_id, data.title, data.content]
        );
        return new Post(response.rows[0]);
    }

    async update(data) {
        const response = await db.query(
            "UPDATE posts SET title = $2, content = $3, WHERE post_id = $1 RETURNING *;",
            [this.id, data.title, data.content]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to update post.");
        return new Post(response.rows[0]);
    }

    // async updateVotes(data) {
    //     const response = await db.query(
    //         "UPDATE skill_share SET votes =$1 WHERE post_id = $2 RETURNING *;",
    //         [this.votes + data.votes, this.id]
    //     );
    //     if (response.rows.length != 1)
    //         throw new Error("Unable to update votes.");
    //     return new Skill(response.rows[0]);
    // }

    async destroy() {
        const response = await db.query(
            "DELETE FROM posts WHERE post_id = $1 RETURNING *;",
            [this.id]
        );
        return new Post(response.rows[0]);
    }
}

module.exports = Post;
