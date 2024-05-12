<?php
namespace reservation;

use Exception;
use shared\Repository;

require_once 'ReservationService.php';

class ReservationRepository extends Repository {
    public function __construct()
    {
        parent::__construct("RESERVATION", new ReservationService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $reservation = [];
        $result = $this->readAll("unable to find any reservation");

        foreach($result as $row) {
            $reservation[] = $row;
        }

        return $reservation;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "reservation not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create reservation");
    }

    public function update($params, string $error = "unexciting reservation could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting reservation cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
