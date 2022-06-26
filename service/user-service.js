const {database} = require("../database/database");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {passwordConfig, jwtConfig} = require("../config");

class UserService {

    async getUsers(order = "id_user") {
        let orderByColumn = order === "username" ? "username" : "id_user";

        return await database().all(
            "SELECT * FROM users ORDER BY " + orderByColumn

        );
    }

    async register(user) {
        const hash = this.hashPassword(user.password);
        const result = await database().run(
            "INSERT INTO users (username, password, role) VALUES (?, ?,?)",
            user.username, hash, user.role
        );
        return await this.getById(result.lastID);
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM users WHERE id_user = ?",
            id
        );
    }

    async deleteUser(username){
        await database().run(
            'DELETE FROM users WHERE username = ?',
            username
        );
    }

    async updateUser(id,users){
        const result = await database().run(
            'UPDATE users SET username = ? WHERE users.id_user = ?',
            users.username, id
        );

        if (result.changes === 0) {
            return null; // not found
        } else {
            return await this.getById(id); // the updated article
        }
    }

    async getByUsername(username) {
        return await database().get(
            'SELECT * FROM users WHERE users.username = ?',
             username
        );
    }
    generateToken(user) {
        const tokenPayload = {
            username: user.username,
            role: user.role
        };
        return jwt.sign(
            tokenPayload,
            jwtConfig.secret,
            {
                algorithm: jwtConfig.algorithms[0]
            }
        );
    }

    hashPassword(password) {
        return crypto.pbkdf2Sync(
            password,
            passwordConfig.salt,
            passwordConfig.iterations,
            passwordConfig.keylen,
            passwordConfig.digest
        ).toString(`hex`);
    }

}

module.exports = new UserService();