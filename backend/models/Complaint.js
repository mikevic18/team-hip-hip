const db = require("../database/connect");
const Post = require("./Post")

class Complaint extends Post{
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
        super(post_id, user_id, title, content, votes, creation_date, update_date, category);
        this.is_approved = is_approved;
        this.admin_comment = admin_comment;
    }

    async updateApproval(data) {
        const response = await db.query(
            "UPDATE complaints SET is_approved = $2 WHERE complaint_id = $1 RETURNING *;",
            [this.id, data.is_approved]
        );
        if (response.rows.length != 1) throw new Error("Unable to approve the complaint.");
        return new Complaint(response.rows[0]);
    }

    async updateAdminComment(data) {
        const response = await db.query(
            "UPDATE complaints SET admin_comment = $2 WHERE complaint_id = $1 RETURNING *;",
            [this.id, data.admin_comment]
        );
        if (response.rows.length != 1) throw new Error("Unable to update comment on the complaint.");
        return new Complaint(response.rows[0]);
    }

}

module.exports = Complaint;
