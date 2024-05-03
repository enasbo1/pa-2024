<?php
namespace entreprise;

use Exception;
use shared\Repository;

require_once 'EntrepriseService.php';

class EntrepriseRepository extends Repository {
    public function __construct()
    {
        parent::__construct("ENTREPRISE", new EntrepriseService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $entreprise = [];
        $result = $this->readAll("unable to find any entreprise");

        foreach($result as $row) {
            $entreprise[] = $row;
        }

        return $entreprise;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "entreprise not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create entreprise");
    }

    public function update($params, string $error = "unexciting entreprise could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting entreprise cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
