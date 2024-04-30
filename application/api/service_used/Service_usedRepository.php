<?php
namespace service_used;

use Exception;
use shared\Repository;

require_once 'Service_usedService.php';

class Service_usedRepository extends Repository {
    public function __construct()
    {
        parent::__construct("SERVICE_UTILISEE", new Service_usedService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $service_used = [];
        $result = $this->readAll("unable to find any service_used");

        foreach($result as $row) {
            $service_used[] = $row;
        }

        return $service_used;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "service_used not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create service_used");
    }

    public function update($params, string $error = "unexciting service_used could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting service_used cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
