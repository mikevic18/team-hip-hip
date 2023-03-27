const db = require("../database/connect");
class Complaint {
    constructor({
        complaint_id,
        title,
        content,
        votes,
        creation_date,
        update_date,
        user_id
    }) {
        this.id = complaint_id;
        this.title = title;
        this.content = content;
        this.votes = votes;
        this.creation_date = creation_date;
        this.update_date = update_date;
        this.user_id = user_id;
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM complaints;"
        );
        if (response.rows.length == 0) throw new Error("No Diaries have been found");
        return response.rows.map((g) => new Complaint(g));
    }

    static async getByRecent() {
        const response = await db.query(
            "SELECT * FROM complaints ORDER BY update_date DESC;"
        );
        if (response.rows.length != 1)
            throw new Error("Unable to locate complaint.");
        return new Complaint(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM complaints WHERE complaints = $1;",
            [id]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to locate complaint.");
        return new Complaint(response.rows[0]);
    }

    static async create(data) {
        data.user_id = data.user_id || 1;
        // const d = new Date(year,month,day,hours,minutes,seconds)
        // const update_date = d.getFullYear;
        const response = await db.query(
            "INSERT INTO complaints (title, content, user_id) VALUES ($1, $2, $3) RETURNING *;",
            [data.title, data.content, data.user_id]
        );

        return response.rows.map((w) => new Complaint(w));
    }

    async update(data) {
        const response = await db.query(
            "UPDATE complaints SET title = $2, content = $3 WHERE complaint_id = $1 RETURNING complaint_id;",
            [this.id, data.title, data.content]
        );
        if (response.rows.length != 1) throw new Error("Unable to update the complaint.");
        return new Complaint(response.rows[0]);
    }

    async updateVote(data) {
        const response = await db.query(
            "UPDATE complaints SET votes WHERE complaint_id = $1 RETURNING complaint_id;",
            [this.id, data.title, data.content]
        );
        if (response.rows.length != 1) throw new Error("Unable to update the complaint.");
        return new Complaint(response.rows[0]);
    }

    async destroy() {
        const response = await db.query(
            "DELETE FROM complaints WHERE complaint_id = $1 RETURNING *;",
            [this.id]
        );
        return new Complaint(response.rows[0]);
    }
}

module.exports = Complaint;
