const db = require("../database/connect");
const Post = require("./Post");
class Complaint extends Post {
    constructor({
        post_id,
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
        super({
            post_id,
            user_id,
            title,
            content,
            votes,
            creation_date,
            update_date,
            category,
        });
        this.is_approved = is_approved;
        this.admin_comment = admin_comment;
    }

    async updateApproval(data) {
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');
        const response = await db.query(
            "UPDATE complaints SET is_approved = $2, update_date = $3 WHERE post_id = $1 RETURNING *;",
            [this.id, data.is_approved, timestamp]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to approve the complaint.");
        return new Complaint(response.rows[0]);
    }

    async updateAdminComment(data) {
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');
        const response = await db.query(
            "UPDATE complaints SET admin_comment = $2, update_date = $3 WHERE post_id = $1 RETURNING *;",
            [this.id, data.admin_comment, timestamp]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to update comment on the complaint.");
        return new Complaint(response.rows[0]);
    }

    static async getById(id) {
        const response = await db.query(
            "SELECT * FROM complaints WHERE post_id = $1;",
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
        const response = await db.query("SELECT * FROM complaints WHERE is_approved = false;");
        if (response.rows.length == 0) throw new Error("No unapproved complaints found")
        return response.rows.map((c) => new Complaint(c));
    }
}

module.exports = Complaint;
