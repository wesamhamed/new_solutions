const { select, insert, update, remove } = require("../database");


class CompanyService {

    static async findById(id) {
        const results = await select("*", "companies", `WHERE id='${id}'`);
        return results.rows[0];
    }

    static async insertOne(data) {
        const result = await insert("companies", data, "RETURNING *");
        return result.rows[0];

    }
    static async updateOne(data) {
        const result = await update("companies", data, `WHERE id =${data.id} RETURNING *`);
        return result.rows[0];

    }
    static async removeById(id) {
        const result = await remove("companies", `WHERE id=${id} RETURNING *`);
        return result.rows[0];
    }
}

module.exports = CompanyService;