CREATE TABLE IF NOT EXISTS users
(
    id_user INTEGER PRIMARY KEY AUTOINCREMENT ,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT

);