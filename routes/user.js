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

//LOGIN
router.post('/login', async (req, res) => {
    // TODO
    // 1. verify input data, throw 400 if something is missing
    // 2. compare the password to the hash stored in the database, throw 401 or 403 if credentials incorrect
    const { username, password } = req.body
    try {
        const username = req.body.username;
        const user = await userService.getByUsername({username})
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            res.status(200).json({
                message: "Login successful",
                user,
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }

    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    const user = await userService.getByUsername(req.body.username);
    const response = {
        token: userService.generateToken(user)
    };

    res.status(201).json(response)
})



//REGISTRATION
router.post('/', async (req, res) => {
    // TODO
    // 3. store a hash of the password in the database instead of the plain password to prevent a leak
    // 4. then use the same hashing function in the login endpoint to compare the entered password to the stored hash
    const data = req.body;

    if (
        data.username === undefined || data.username?.trim() === "" ||
        data.password === undefined || data.password?.trim() === ""
    ) {
        res.status(400).send("Bad input");
        return;
    }

    const user = await userService.register(data);

    res.status(201).json(user);

    const hash = userService.hashPassword(req.body.password);
    console.log(hash);

    res.status(201).send();
})

//Secretary (passenger id) Technician(capacity,status)
router.put('/:username', async (req, res) => {
    const data = req.body;
    const username = parseInt(req.params.username);


    const user = await userService.update(id, data); //TODO

    if (!flight) {
        res.status(404).send("Not found")
        return;
    }

    res.status(202).json(flight);
})

router.delete('/:username', async (req, res) => {
    const username = parseInt(req.params.username);
    await userService.deleteUser(username); //TODO
    res.status(204).send("No Content");
})

module.exports = router;