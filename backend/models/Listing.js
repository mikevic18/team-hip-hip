const db = require("../database/connect");
class Listing {
    constructor({
        item_id,
        title,
        description,
        image_url,
        price,
        sold,
        creation_date,
        update_date,
        user_id
    }) {
        this.id = item_id;
        this.title = title;
        this.content = description;
        this.price = price;
        this.sold = sold;
        this.image_url = image_url;
        this.creation_date = creation_date;
        this.update_date = update_date;
        this.user_id = user_id;
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM listings;"
        );
        if (response.rows.length < 0) throw new Error("No Listings have been found");
        return response.rows.map((g) => new Listing(g));
    }

    static async getByRecent() {
        const response = await db.query(
            "SELECT * FROM listings ORDER BY update_date DESC;"
        );
        if (response.rows.length < 1) throw new Error("Unable to locate post.");
        return new Listing(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM listings WHERE item_id = $1;",
            [id]
        );
        if (response.rows.length < 1)
            throw new Error("Unable to locate post.");
        return new Listing(response.rows[0]);
    }

    static async create(data) {
        data.user_id = data.user_id || 1;
        // const d = new Date(year,month,day,hours,minutes,seconds)
        // const update_date = d.getFullYear;
        const response = await db.query(
            "INSERT INTO listings (title, content, user_id) VALUES ($1, $2, $3) RETURNING *;",
            [data.title, data.content, data.user_id]
        );

        return response.rows.map((w) => new Listing(w));
    }

    async update(data) {
        const response = await db.query(
            "UPDATE listings SET title = $2, content = $3 WHERE item_id = $1 RETURNING *;",
            [this.id, data.title, data.content]
        );
        if (response.rows.length < 1) throw new Error("Unable to update votes.");
        return new Listing(response.rows[0]);
    }

    async destroy() {
        const response = await db.query(
            "DELETE FROM listings WHERE item_id = $1 RETURNING *;",
            [this.id]
        );
        return new Listing(response.rows[0]);
    }
}

module.exports = Listing;
