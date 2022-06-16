const {database} = require("../database/database");

class FlightService {

    async getAll(order = "id_flight") {
        // Never use the user's order directly! It may contain SQL injection.
        // Cannot use binding with "?" for ORDER BY, hence, must validate the order manually using a condition.
        let orderByColumn = order === "status" ? "status" : "id_flight";

        return await database().all(
            "SELECT * FROM flights ORDER BY " + orderByColumn
        );
    }

    async getById(id_flight) {
        return await database().get(
            "SELECT * FROM flights WHERE id_flight = ?",
            id_flight
        );
    }

    async create(flight) {
        const result = await database().run(
            "INSERT INTO flights (date, capacity, status) VALUES (?, ?,?)",
            flight.date,
            flight.capacity,
            flight.status
        );
        return await this.getById(result.lastID);
    }

    async update(id_flight, flight) {
        const result = await database().run(
            "UPDATE flights SET capacity = ?, status = ? WHERE id_flight = ?",
            flight.capacity, flight.status, id_flight
        );

        if (result.changes === 0) {
            return null; // not found
        } else {
            return await this.getById(id_flight); // the updated article
        }
    }

    async delete(id_flight) {
        await database().run(
            "DELETE FROM flights WHERE id_flight = ?",
            id_flight
        );
    }
}

module.exports = new FlightService();