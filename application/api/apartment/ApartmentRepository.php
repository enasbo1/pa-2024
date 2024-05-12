<?php
namespace apartment;

use Exception;
use shared\Repository;

require_once 'ApartmentService.php';

class ApartmentRepository extends Repository {
    public function __construct()
    {
        parent::__construct("APPARTEMENT", new ApartmentService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $apartment = [];
        $result = $this->readAll("unable to find any apartment");

        foreach($result as $row) {
            $apartment[] = $row;
        }

        return $apartment;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "apartment not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create apartment");
    }

    public function update($params, string $error = "unexciting apartment could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting apartment cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
