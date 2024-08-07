<?php
namespace users;

use Exception;
use shared\Repository;

require_once 'UsersService.php';

class UsersRepository extends Repository {
    public function __construct()
    {
        parent::__construct("UTILISATEUR", new UsersService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $users = [];
        $result = $this->readAll("unable to find any users");

        foreach($result as $row) {
            $users[] = $row;
        }

        return $users;
    }

    /**
     * @throws Exception
     */
    public function connect(string $email, string $password): array
    {
        return $this->get($this->modelName, ["id", "prenom", "nom", "role", "id_entreprise"], ["mail" => $email, "mdp"=>$password], "users not found");
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "users not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create users");
    }

    public function update($params, string $error = "unexciting users could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting users cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
