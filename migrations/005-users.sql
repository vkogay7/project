CREATE TABLE IF NOT EXISTS flights
(
    `id_flight` INT NOT NULL PRIMARY KEY ,
    `date` DATETIME NOT NULL DEFAULT NULL,
    `capacity` INT DEFAULT NULL,
    `id_passenger` INT,
    id_reservation INT,
    FOREIGN KEY (id_passenger)
        REFERENCES passenger (id_passenger),
    FOREIGN KEY (id_reservation)
        REFERENCES reservation (id_reservation)

);