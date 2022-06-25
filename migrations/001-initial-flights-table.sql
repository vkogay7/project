CREATE TABLE IF NOT EXISTS flights
(
    id_flight INTEGER  PRIMARY KEY AUTOINCREMENT ,
    date DATETIME DEFAULT NULL,
    capacity INTEGER DEFAULT NULL,
    id_user INTEGER,
    status text,
    id_reservation INT,
    id_notification INT,
    FOREIGN KEY (id_user)
        REFERENCES users (id_user),
    FOREIGN KEY (id_reservation)
        REFERENCES reservation (id_reservation),
    FOREIGN KEY (id_notification)
        REFERENCES notification (id_notification)


);