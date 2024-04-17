<?php
use shared\Repository;

require_once 'UsersService.php';
include_once './shared/Repository.php';
class UsersRepository extends \shared\Repository {

    public function getAll() {
        $query = "SELECT * FROM UTILISATEUR";
        $result = pg_query($this->connection, $query);

        if (!$result) {
            throw new Exception(pg_last_error($this->connection));
        }

        $users = array();

        while ($row = pg_fetch_assoc($result)) {
            $users[] = $row;
        }

        return $users;
    }

    public function findById($id) {
        $query = "SELECT id, prenom, nom, mail, role FROM UTILISATEUR WHERE id = $id";
        $result = pg_query($this->connection, $query);

        if (!$result) {
            throw new Exception("User not found", 404);
        }

        $user = pg_fetch_assoc($result);
        return $user;
    }

    public function save($params) {
        $check = new UsersService();
        $params = $check->prepareSave($params);

        $query = "INSERT INTO UTILISATEUR (prenom, nom, mail, mdp, adresse, pays, ville, code_postal, numero, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
        pg_prepare($this->connection, "", $query);
        $result = pg_execute($this->connection, "", array(
            $params->prenom,
            $params->nom,
            $params->mail,
            $params->mdp,
            $params->adresse,
            $params->pays,
            $params->ville,
            $params->code_postal,
            $params->numero,
            $params->role
        ));

        if (!$result) {
            throw new Exception("Failed to create user", 500);
        }
    }

    public function update($params) {
        $check = new UsersService();
        $params = $check->prepareUpdate($params);

        $query = "UPDATE UTILISATEUR SET prenom = $1, nom = $2, mail = $3, mdp = $4, adresse = $5, pays = $6, ville = $7, code_postal = $8, numero = $9, role = $10 WHERE id = $11";
        pg_prepare($this->connection, "", $query);
        $result = pg_execute($this->connection, "", array(
            $params->prenom,
            $params->nom,
            $params->mail,
            $params->mdp,
            $params->adresse,
            $params->pays,
            $params->ville,
            $params->code_postal,
            $params->numero,
            $params->role,
            $params->id
        ));

        if (!$result) {
            throw new Exception("Failed to update user", 500);
        }
    }

    public function delete($id) {
        $query = "DELETE FROM UTILISATEUR WHERE id = $id";
        $result = pg_query($this->connection, $query);

        if (!$result) {
            throw new Exception("Failed to delete user", 500);
        }
    }
}
?>
