const {database} = require("../database/database");

class ArticleService {

    async getAll(order = "id") {
        // Never use the user's order directly! It may contain SQL injection.
        // Cannot use binding with "?" for ORDER BY, hence, must validate the order manually using a condition.
        let orderByColumn = order === "title" ? "title" : "id";

        return await database().all(
            "SELECT * FROM articles ORDER BY " + orderByColumn
        );
    }

    async getById(id) {
        return await database().get(
            "SELECT * FROM articles WHERE id = ?",
            id
        );
    }

    async create(article) {
        const result = await database().run(
            "INSERT INTO articles (title, text) VALUES (?, ?)",
            article.title,
            article.text
        );
        return await this.getById(result.lastID);
    }
}

module.exports = new ArticleService();