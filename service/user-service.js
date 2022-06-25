const {database} = require("../database/database");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {genSaltSync, hashSync} = require("bcrypt");
const req = require("express/lib/request");
const bcrypt = require("bcrypt");

class UserService {

    async getByUsername(username) {
        return await database().get(
            "SELECT * FROM users WHERE username = ?",
            username
        );
    }

    async getUsers(order = "id_user") {
        let orderByColumn = order === "username" ? "username" : "id_user";

        return await database().all(
            "SELECT * FROM users ORDER BY " + orderByColumn

        );
    }

    async createUser(user){

        const salt = genSaltSync(10);
        //const password = bcrypt.hashSync(req.body.password, salt)
        const result = await database().run(
            "INSERT INTO users (username, password, role) VALUES (?,?,?)",
            user.username,
            user.password,
            user.role
        );
        return await this.getByUsername(result.lastID);
        };

    async deleteUser(username){
        await database().run(
            "DELETE FROM users WHERE id_user = ?",
            id_user
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