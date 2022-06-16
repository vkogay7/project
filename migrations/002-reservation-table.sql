CREATE TABLE IF NOT EXISTS reservation
(
    id_reservation  INTEGER PRIMARY KEY AUTOINCREMENT,
    date datetime,
    capacity INTEGER,
    status text,
    id_passenger INTEGER FOREIGN KEY
)