const express = require("express");
const router = express.Router();
const userService = require('../service/user-service')

router.get('/', async (req, res) => {
    const order = req.query.order;
    const users = await userService.getUsers(order);
    res.json(users);
})

//Everyone
router.get('/:username', async (req, res) => {
    const username = parseInt(req.params.username);
    const user = await userService.getByUsername(username);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send("Not found");
    }
})


router.post('/api/users', async (req, res) => {
    const data = req.body;


    const user = await userService.createUser(data);

    res.status(201).json(user);
})


//Secretary (passenger id) Technician(capacity,status)
router.put('/api/users/:id', async (req, res) => {
    const data = req.body;
    const username = parseInt(req.params.username);


    const user = await userService.update(id, data); //TODO

    if (!flight) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(flight);
})

router.delete('/api/users/:id', async (req, res) => {
    const username = parseInt(req.params.username);
    await userService.deleteUser(username); //TODO
    res.status(204).send("No Content");
})

module.exports = router;