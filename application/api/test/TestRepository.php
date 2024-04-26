<?php
namespace test;

use Exception;
use shared\Repository;

require_once 'TestService.php';
include_once './shared/Repository.php';

class TestRepository extends Repository {
    public function __construct()
    {
        parent::__construct("test", new TestService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $test = [];
        $result = $this->readAll("unable to find any test");

        foreach($result as $row) {
            $test[] = $row;
        }

        return $test;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "test not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create test");
    }

    public function update($params, string $error = "unexciting test could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting {{name}} cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
