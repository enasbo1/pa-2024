<?php
namespace sanction_spec;

use Exception;
use shared\Repository;

require_once 'Sanction_specService.php';

class Sanction_specRepository extends Repository {
    public function __construct()
    {
        parent::__construct("SANCTION_SPEC", new Sanction_specService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $sanction_spec = [];
        $result = $this->readAll("unable to find any sanction_spec");

        foreach($result as $row) {
            $sanction_spec[] = $row;
        }

        return $sanction_spec;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "sanction_spec not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create sanction_spec");
    }

    public function update($params, string $error = "unexciting sanction_spec could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting sanction_spec cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
