const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
sqlite3.verbose();

let connection;

async function initializeDatabase() {
    connection = await open({
        filename: './database/database.sqlite',
        driver: sqlite3.Database
    })
    connection.on("trace", sql => console.log(sql));
    await connection.migrate();
}

function database() {
    return connection;
}

module.exports = { initializeDatabase, database };