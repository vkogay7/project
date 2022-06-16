CREATE TABLE IF NOT EXISTS flights
(
    id_flight    INTEGER PRIMARY KEY AUTOINCREMENT,
    date text,
    capacity INTEGER,
    status text,
    passenger_id text,
    reservation_id text
)