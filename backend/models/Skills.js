const db = require("../database/connect");

class Skill {
    constructor({
        post_id,
        user_id,
        title,
        content,
        video_url,
        votes,
        creation_date
    }) {
        this.id = post_id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.video_url = video_url;
        this.votes = votes;
        this.creation_date = creation_date;
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM skill_share;"
        );
        if (response.rows.length == 0) throw new Error("No skills have been found.");
        return response.rows.map((g) => new Skill(g));
    }

    static async getByRecent() {
        const response = await db.query(
            "SELECT * FROM skill_share ORDER BY creation_date DESC;"
        );
        if (response.rows.length < 1) throw new Error("Unable to locate skills.");
        return response.rows.map((g) => new Skill(g));
    }

    static async getByTop() {
        const response = await db.query(
            "SELECT * FROM skill_share ORDER BY votes DESC;"
        );
        if (response.rows.length < 1) throw new Error("Unable to locate skills.");
        return response.rows.map((g) => new Skill(g));
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM skill_share WHERE post_id = $1;",
            [id]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to locate skill.");
        return new Skill(response.rows[0]);
    }

    static async create(data) {
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace("T", " ");
        const response = await db.query(
            `INSERT INTO skill_share (user_id, title, content, creation_date, update_date, video_url) VALUES ($1, $2, $3, $4, $4, $5) RETURNING *;`,
            [data.user_id, data.title, data.content, timestamp, data.video_url]
        );
        return new Skill(response.rows[0]);
    }

    async update(data) {
        const response = await db.query(
            "UPDATE skill_share SET title = $2, content = $3, video_url = $4 WHERE post_id = $1 RETURNING *;",
            [this.id, data.title, data.content, data.video_url]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to update skill.");
        return new Skill (response.rows[0]);
    }

    async updateVotes(data) {
        const response = await db.query(
            "UPDATE skill_share SET votes =$1 WHERE post_id = $2 RETURNING *;",
            [this.votes + parseInt(data.votes), this.id]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to update votes.");
        return new Skill(response.rows[0]);
    }
    static async getUnapproved() {
        const response = await db.query(
            "SELECT * FROM skills WHERE is_approved = false;"
        );
        if (response.rows.length == 0)
            throw new Error("No unapproved complaints found");
        return response.rows.map((c) => new Complaint(c));
    }
    async destroy() {
        const response = await db.query(
            "DELETE FROM skill_share WHERE post_id = $1 RETURNING *;",
            [this.id]
        );
        return new Skill(response.rows[0]);
    }
}

module.exports = Skill;
