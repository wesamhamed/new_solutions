const { select, insert, update, remove } = require("../database");


class ProfileService {

    static async findById(id) {
        const results = await select("*", "profiles", `WHERE id='${id}'`);
        return results.rows[0];
    }

    static async insertOne(data) {
        const result = await insert("profiles", data, "RETURNING *");
        return result.rows[0];

    }
    static async updateOne(data) {
        const result = await update("profiles", data, `WHERE id =${data.id} RETURNING *`);
        return result.rows[0];

    }
    static async removeById(id) {
        const result = await remove("profiles", `WHERE id=${id} RETURNING *`);
        return result.rows[0];
    }
}

module.exports = ProfileService;