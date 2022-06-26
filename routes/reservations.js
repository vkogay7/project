const express = require("express");
const router = express.Router();
const reservationService = require('../service/reservations-service')



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


router.post('/', async (req, res) => {
    const data = req.body;


    const reservation = await reservationService.create(data);

    res.status(201).json(reservation);
})


//Secretary (passenger id) Technician(capacity,status)
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

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await reservationService.delete(id);
    res.status(204).send("No Content");
})

module.exports = router;