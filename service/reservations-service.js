const {database} = require("../database/database");

class ReservationService {

    async getAll(order = "id_reservation") {
        // Never use the user's order directly! It may contain SQL injection.
        // Cannot use binding with "?" for ORDER BY, hence, must validate the order manually using a condition.
        let orderByColumn = order === "status" ? "status" : "id_reservation";

        return await database().all(
            "SELECT * FROM reservation ORDER BY " + orderByColumn
        );
    }

    async getById(id_reservation) {
        return await database().get(
            "SELECT * FROM reservation WHERE id_reservation = ?",
            id_reservation
        );
    }

    async create(reservation) {
        const result = await database().run(
            "INSERT INTO reservation (capacity, status) VALUES (?,?)",
            reservation.capacity,
            reservation.status
        );
        return await this.getById(result.lastID);
    }

    async update(id_reservation, reservation) {
        const result = await database().run(
            "UPDATE reservation SET capacity = ?, status = ? WHERE id_reservation = ?",
            reservation.capacity, reservation.status, id_reservation
        );

        if (result.changes === 0) {
            return null; // not found
        } else {
            return await this.getById(id_reservation); // the updated article
        }
    }

    async delete(id_reservation) {
        await database().run(
            "DELETE FROM reservation WHERE id_reservation = ?",
            id_reservation
        );
    }
}

module.exports = new ReservationService();