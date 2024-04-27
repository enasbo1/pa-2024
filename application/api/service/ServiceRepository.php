<?php
namespace service;

use Exception;
use shared\Repository;

require_once 'ServiceService.php';
include_once './shared/Repository.php';

class ServiceRepository extends Repository {
    public function __construct()
    {
        parent::__construct("SERVICE", new ServiceService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $service = [];
        $result = $this->readAll("unable to find any service");

        foreach($result as $row) {
            $service[] = $row;
        }

        return $service;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "service not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create service");
    }

    public function update($params, string $error = "unexciting service could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting {{name}} cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
