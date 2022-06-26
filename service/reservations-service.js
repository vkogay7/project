const {database} = require("../database/database");

class ReservationService {

    async getAll(order = "id_reservation") {
        // Never use the user's order directly! It may contain SQL injection.
        // Cannot use binding with "?" for ORDER BY, hence, must validate the order manually using a condition.
        let orderByColumn = order === "status" ? "status" : "id_reservation";

        return await database().all(
            "SELECT * FROM reservations ORDER BY " + orderByColumn
        );
    }

    async getById(id_reservation) {
        return await database().get(
            "SELECT * FROM reservations WHERE id_reservation = ?",
            id_reservation
        );
    }

    async create(reservation) {
        const result = await database().run(
            "INSERT INTO reservations (id_user, date) VALUES (?,?)",
            reservation.id_user,
            reservation.date
        );
        return await this.getById(result.lastID);
    }

    async update(id_reservation, reservations) {
        const result = await database().run(
            "UPDATE reservations SET capacity = ?, status = ?,id_user =? WHERE id_reservation = ?",
            reservations.capacity, reservations.status, reservations.id_user,id_reservation
        );

        if (result.changes === 0) {
            return null; // not found
        } else {
            return await this.getById(id_reservation); // the updated article
        }
    }

    async delete(id_reservation) {
        await database().run(
            "DELETE FROM reservations WHERE id_reservation = ?",
            id_reservation
        );
    }
}

module.exports = new ReservationService();