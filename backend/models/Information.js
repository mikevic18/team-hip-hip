const db = require("../database/connect");
class Information {
    constructor({
        post_id,
        title,
        content,
        creation_date,
        update_date,
        user_id,
    }) {
        this.id = post_id;
        this.title = title;
        this.content = content;
        this.votes = votes;
        this.creation_date = creation_date;
        this.update_date = update_date;
        this.user_id = user_id;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM information;");
        if (response.rows.length < 1)
            throw new Error("No information entries have been found");
        return response.rows.map((g) => new Information(g));
    }

    static async getByRecent() {
        const response = await db.query(
            "SELECT * FROM information ORDER BY update_date DESC;"
        );
        if (response.rows.length < 1) throw new Error("Unable to locate post.");
        return new Information(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM information WHERE post_id = $1;",
            [id]
        );
        if (response.rows.length < 1) throw new Error("Unable to locate post.");
        return new Information(response.rows[0]);
    }

    static async create(data) {
        data.user_id = data.user_id || 1;
        // const d = new Date(year,month,day,hours,minutes,seconds)
        // const update_date = d.getFullYear;
        const response = await db.query(
            "INSERT INTO information (title, content, user_id) VALUES ($1, $2, $3) RETURNING *;",
            [data.title, data.content, data.user_id]
        );

        return response.rows.map((w) => new Information(w));
    }

    async update(data) {
        const response = await db.query(
            "UPDATE information SET title = $2, content = $3 WHERE content_id = $1 RETURNING content_id;",
            [this.id, data.title, data.content]
        );
        console.log(response.rows[0]);
        if (response.rows.length < 1)
            throw new Error("Unable to update the information post.");
        return new Information(response.rows[0]);
    }

    async destroy() {
        const response = await db.query(
            "DELETE FROM complaints WHERE complaint_id = $1 RETURNING *;",
            [this.id]
        );
        return new Information(response.rows[0]);
    }
}

module.exports = Information;
