CREATE TABLE IF NOT EXISTS reservations
(
    id_reservation  INTEGER PRIMARY KEY AUTOINCREMENT,
    date datetime NOT NULL,
    capacity INTEGER,
    status text,
    id_user INT,
    id_notification INT,
    FOREIGN KEY (id_user)
        REFERENCES users (id_user),
    FOREIGN KEY (id_notification)
        REFERENCES notification (id_notification)
)