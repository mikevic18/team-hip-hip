const db = require("../database/connect");
class Complaint {
    constructor({
        complaint_id,
        user_id,
        title,
        content,
        votes,
        creation_date,
        update_date,
        category,
        is_approved,
        admin_comment        
    }) {
        this.complaint_id = complaint_id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.votes = votes;
        this.creation_date = creation_date;
        this.update_date = update_date;
        this.category = category;
        this.is_approved = is_approved;
        this.admin_comment = admin_comment;
    }

    static async create(data) {
        // data.user_id = data.user_id || 1;
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace("T", " ");
        const response = await db.query(
            `INSERT INTO complaints (user_id, title, content, creation_date, update_date) VALUES ($1, $2, $3, $4, $4) RETURNING *;`,
            [data.user_id, data.title, data.content, timestamp]
        );
        return new Complaint(response.rows[0]);
    }
    async updateApproval(data) {
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace("T", " ");
        const response = await db.query(
            "UPDATE complaints SET is_approved = $2, update_date = $3 WHERE post_id = $1 RETURNING *;",
            [this.complaint_id, data.is_approved, timestamp]
        );
        if (response.rows.length != 1)
            throw new Error(
                "Unable to approve the complaint. Please try again."
            );
        return new Complaint(response.rows[0]);
    }

    async updateAdminComment(data) {
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace("T", " ");
        const response = await db.query(
            "UPDATE complaints SET admin_comment = $2, update_date = $3 WHERE post_id = $1 RETURNING *;",
            [this.complaint_id, data.admin_comment, timestamp]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to update comment on the complaint.");
        return new Complaint(response.rows[0]);
    }

    static async getById(id) {
        const response = await db.query(
            "SELECT * FROM complaints WHERE complaint_id = $1;",
            [id]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to locate complaint.");
        return new Complaint(response.rows[0]);
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM complaints;");
        if (response.rows.length == 0)
            throw new Error("No complaints have been found.");
        return response.rows.map((c) => new Complaint(c));
    }

    static async getUnapproved() {
        const response = await db.query(
            "SELECT * FROM complaints WHERE is_approved = false;"
        );
        if (response.rows.length == 0)
            throw new Error("No unapproved complaints found");
        return response.rows.map((c) => new Complaint(c));
    }
    async updateComplaint(data){
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace("T", " ");
        console.log(data);
        const response = await db.query(
            "UPDATE complaints SET title = $2, content = $3, update_date = $4 WHERE complaint_id = $1 RETURNING *;",
            [this.complaint_id, data.title, data.content, timestamp]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to update comment on the complaint.");
        return new Complaint(response.rows[0]);
    }
    async destroy() {
        const response = await db.query(
            "DELETE FROM complaints WHERE complaint_id = $1 RETURNING *;",
            [this.complaint_id]
        );
        return new Complaint(response.rows[0]);
    }
}

module.exports = Complaint;
