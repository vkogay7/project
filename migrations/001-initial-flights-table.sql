CREATE TABLE IF NOT EXISTS flights
(
    id_flight    INTEGER PRIMARY KEY AUTOINCREMENT,
    date datetime,
    capacity INTEGER,
    status text,
    id_reservation INTEGER FOREIGN KEY
    id_passenger INTEGER FOREIGN KEY
)