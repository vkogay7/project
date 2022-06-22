CREATE TABLE IF NOT EXISTS reservation
(
    id_reservation  INTEGER PRIMARY KEY AUTOINCREMENT,
    date datetime NOT NULL,
    capacity INTEGER,
    status text,
    id_passenger INT,
    id_notification INT,
    FOREIGN KEY (id_passenger)
        REFERENCES passenger (id_passenger),
    FOREIGN KEY (id_notification)
        REFERENCES notification (id_notification)
)