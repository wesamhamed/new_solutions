const { select, insert, update, remove } = require("../database");


class AddressService {

    static async findById(id) {
        const results = await select("*", "addresses", `WHERE id='${id}'`);
        return results.rows[0];
    }

    static async insertOne(data) {
        const result = await insert("addresses", data, "RETURNING id");
        return result.rows[0];

    }
    static async updateOne(data) {
        const result = await update("addresses", data, `WHERE id =${data.id} RETURNING *`);
        return result.rows[0];

    }
    static async removeById(id) {
        const result = await remove("addresses", `WHERE id=${id} RETURNING *`);
        return result.rows[0];
    }
}

module.exports = AddressService;