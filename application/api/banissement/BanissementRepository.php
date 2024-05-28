<?php
namespace banissement;

use Exception;
use shared\Repository;

require_once 'BanissementService.php';

class BanissementRepository extends Repository {
    public function __construct()
    {
        parent::__construct("BANISSEMENT", new BanissementService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $banissement = [];
        $result = $this->readAll("unable to find any banissement");

        foreach($result as $row) {
            $banissement[] = $row;
        }

        return $banissement;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "banissement not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create banissement");
    }

    public function update($params, string $error = "unexciting banissement could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting banissement cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
