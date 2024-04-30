<?php
namespace service_apartment;

use Exception;
use shared\Repository;

require_once 'Service_apartmentService.php';

class Service_apartmentRepository extends Repository {
    public function __construct()
    {
        parent::__construct("SERVICE_APPARTEMENT", new Service_apartmentService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $service_apartment = [];
        $result = $this->readAll("unable to find any service_apartment");

        foreach($result as $row) {
            $service_apartment[] = $row;
        }

        return $service_apartment;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "service_apartment not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create service_apartment");
    }

    public function update($params, string $error = "unexciting service_apartment could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting service_apartment cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
