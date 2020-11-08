const { select, insert } = require("../database");


class UserService {

    static async findById(id) {
        const results = await select("*", "users", `WHERE id='${id}'`);
        return results.rows[0];
    }
    static async findByEmail(email) {
        const results = await select("*", "users", `WHERE email='${email}'`);

        return results.rows[0];
    }
    static async insertOne(data) {
        const result = await insert("users", data, "RETURNING id");
        return result.rows[0];

    }
}

module.exports = UserService;