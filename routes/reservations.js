const express = require("express");
const router = express.Router();
const reservationService = require('../service/reservations-service')
const flightService = require("../service/flights-service");


//Everyone
router.get('/', async (req, res) => {
    const order = req.query.order;
    const reservations = await reservationService.getAll(order);
    res.json(reservations);
})

//Everyone
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const reservation = await reservationService.getById(id);

    if (reservation) {
        res.json(reservation);
    } else {
        res.status(404).send("Not found");
    }
})

//Everyone
router.post('/', async (req, res) => {
    const data = req.body;

    if (
        data.capacity === undefined || data.capacity?.trim() === "" ||
        data.status === undefined || data.status?.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const reservation = await reservationService.create(data);

    res.status(201).json(reservation);
})

//Everyone
router.put('/:id', async (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);


    const reservation = await reservationService.update(id, data);

    if (!reservation) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(reservation);
})


//Everyone  Zákazník může zrušit rezervaci.
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await reservationService.delete(id);
    res.status(204).send("No Content");
})

module.exports = router;