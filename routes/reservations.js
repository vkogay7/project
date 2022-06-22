const express = require("express");
const router = express.Router();
const flightService = require('../service/flights-service')


//Everyone
router.get('/', async (req, res) => {
    const order = req.query.order;
    const flights = await flightService.getAll(order);
    res.json(flights);
})

//Everyone
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const flight = await flightService.getById(id);

    if (flight) {
        res.json(flight);
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

    const flight = await flightService.create(data);

    res.status(201).json(flight);
})

//Everyone
router.put('/:id', (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);

    if (
        isNaN(id) ||
        data.capacity === undefined || data.capacity?.trim() === "" ||
        data.status === undefined || data.status?.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const flight = flights.find(flight => flight.id === id); //TODO

    if (flight === undefined) {
        res.status(404).send("Not found")
        return;
    }

    flight.capacity = data.capacity;
    flight.status = data.status;

    res.status(202).json(flight);
})


//Everyone  Zákazník může zrušit rezervaci.
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = flights.findIndex(flight => flight.id === id); //TODO

    if (index !== -1) {
        flights.splice(index, 1);
        res.status(204).send("No Content");
    } else {
        res.status(404).send("Not Found");
    }
})

module.exports = router;