const express = require('express')
const app = express()
const {initializeDatabase} = require('./database/database')
const homepageRouter = require('./routes/homepage')
const articlesRouter = require('./routes/articles')

initializeDatabase();

app.use(express.json());

app.use('/', homepageRouter);
app.use('/articles', articlesRouter);

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})