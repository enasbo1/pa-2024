<?php
namespace users;
use Exception;

require_once 'UsersService.php';
include_once './shared/Repository.php';
class UsersRepository extends \shared\Repository {

    public function __construct()
    {
        parent::__construct("UTILISATEUR", new UsersService());
    }

    /**
     * @return array
     * @throws Exception
     */
    public function getAll(): array
    {
        $users = [];
        $result = $this->readAll("unable to find any user");

        foreach($result as $row) {
            $users[] = $row;
        }

        return $users;
    }

    /**
     * @param int $id
     * @return array
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "user not found");
    }

    /**
     * @param object $params
     * @throws Exception
     */
    public function save(object $params): void
    {
        $this->create($params, "unable to create user");
    }

    /**
     * @param object $params
     * @param string $error
     * @return bool|Exception
     * @throws Exception
     */
    public function update(object $params, string $error= "unexciting user could not be updated"): bool|Exception
    {
        return parent::update($params, $error);
    }

    /**
     * @param int $id
     * @param string $error
     * @throws Exception
     */
    public function delete(int $id, string $error = "unexciting user cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
