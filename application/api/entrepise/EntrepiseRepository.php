<?php
namespace entrepise;

use Exception;
use shared\Repository;

require_once 'EntrepiseService.php';
include_once './shared/Repository.php';

class EntrepiseRepository extends Repository {
    public function __construct()
    {
        parent::__construct("ENTREPRISE", new EntrepiseService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $entrepise = [];
        $result = $this->readAll("unable to find any entrepise");

        foreach($result as $row) {
            $entrepise[] = $row;
        }

        return $entrepise;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "entrepise not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create entrepise");
    }

    public function update($params, string $error = "unexciting entrepise could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting {{name}} cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
