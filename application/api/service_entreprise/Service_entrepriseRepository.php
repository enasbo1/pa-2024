<?php
namespace service_entreprise;

use Exception;
use shared\Repository;

require_once 'Service_entrepriseService.php';

class Service_entrepriseRepository extends Repository {
    public function __construct()
    {
        parent::__construct("SERVICE_ENTREPRISE", new Service_entrepriseService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $service_entreprise = [];
        $result = $this->readAll("unable to find any service_entreprise");

        foreach($result as $row) {
            $service_entreprise[] = $row;
        }

        return $service_entreprise;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "service_entreprise not found");
    }

    public function findByService(int $id): array
    {
        return $this->query("SELECT * from entreprise where id = any((select se.id_entreprise from service_entreprise se where se.id_service=$1));",
        ["id" => $id], "service_entreprise not found");
    }

    public function findByEntreprise(int $id): array
    {
        return $this->query("SELECT * from SERVICE where id = any((select se.id_service from service_entreprise se where se.service_entreprise=$1));",
        ["id" => $id], "service_entreprise not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create service_entreprise");
    }

    public function update($params, string $error = "unexciting service_entreprise could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting service_entreprise cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
