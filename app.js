const express = require('express')
const app = express()
const {initializeDatabase} = require('./database/database')
const homepageRouter = require('./routes/homepage')
const flightsRouter = require('./routes/flights')
const userRouter = require('./routes/user')
const reservationsRouter = require('./routes/reservations')

initializeDatabase();

app.use(express.json());

app.use('/', homepageRouter);
app.use('/flights', flightsRouter);
app.use('/users',userRouter);
app.use('/reservations', reservationsRouter);

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})