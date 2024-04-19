<?php
use shared\Repository;

require_once 'ReservationService.php';
include_once './shared/Repository.php';

class ReservationRepository extends Repository
{

    public function getAll() {
        $query = "SELECT * FROM reservation"; // Modification du nom de la table
        $result = pg_query($this->connection, $query);

        if (!$result) {
            throw new Exception(pg_last_error($this->connection));
        }

        $reservations = array();

        while ($row = pg_fetch_assoc($result)) {
            $reservations[] = $row;
        }

        return $reservations;
    }

    public function findById($id) {
        $query = "SELECT * FROM reservation WHERE id = $id"; // Modification du nom de la table et de la colonne
        $result = pg_query($this->connection, $query);

        if (!$result) {
            throw new Exception("Not Found", 404);
        }

        $reservation = pg_fetch_assoc($result);
        return $reservation;
    }

    public function save($params) {
        $check = new ReservationService();
        $params = $check->prepareSave($params);

        $query = "INSERT INTO reservation (start_date, end_date, client, id_appartement, total_location) VALUES ($1, $2, $3, $4, $5)"; // Modification du nom de la table et des colonnes
        pg_prepare($this->connection, "", $query);
        $result = pg_execute($this->connection, "", array($params->startDate, $params->endDate, $params->client, $params->apartment, $params->total_location));

        if (!$result) {
            throw new Exception(pg_last_error($this->connection));
        }
    }

    public function update($reservation) {
        $check = new ReservationService();
        $reservation = $check->prepareUpdate($reservation);

        $query = "UPDATE reservation SET start_date = $1, end_date = $2, client = $3, id_appartement = $4, total_location = $5 WHERE id = $6"; // Modification du nom de la table et des colonnes
        pg_prepare($this->connection, "", $query);
        $result = pg_execute($this->connection, "", array($reservation->startDate, $reservation->endDate, $reservation->client, $reservation->apartment, $reservation->total_location, $reservation->id));

        if (!$result) {
            throw new Exception(pg_last_error($this->connection));
        }
    }

    public function delete($id) {
        $query = "DELETE FROM reservation WHERE id = $id"; // Modification du nom de la table et de la colonne
        $result = pg_query($this->connection, $query);

        if (!$result) {
            throw new Exception(pg_last_error($this->connection));
        }
    }
}
?>
