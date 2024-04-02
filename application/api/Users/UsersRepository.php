<?php
require_once 'UsersService.php';

class UsersRepository {
    private $connection = null;

    public function __construct() {
        try {
            $this->connection = pg_connect("host=database port=5432 dbname=pa_unnamed user=unknown password=password");
            if ($this->connection === false) {
                throw new Exception("Could not connect to database.");
            }
        } catch (Exception $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public function getAll() {
        $query = "SELECT usr_id, usr_firstname, usr_lastname, usr_email, usr_role FROM utilisateur";
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
        $query = "SELECT usr_id, usr_firstname, usr_lastname, usr_email, usr_role FROM utilisateur WHERE usr_id = $id";
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

        $query = "INSERT INTO utilisateur (usr_firstname, usr_lastname, usr_email, usr_password, usr_address, usr_country, usr_city, usr_postal_code, usr_phone_number, usr_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
        pg_prepare($this->connection, "", $query);
        $result = pg_execute($this->connection, "", array(
            $params->firstname,
            $params->lastname,
            $params->email,
            $params->password,
            $params->address,
            $params->country,
            $params->city,
            $params->postal_code,
            $params->phone_number,
            $params->role
        ));

        if (!$result) {
            throw new Exception("Failed to create user", 500);
        }
    }

    public function update($params) {
        $check = new UsersService();
        $params = $check->prepareUpdate($params);

        $query = "UPDATE utilisateur SET usr_firstname = $1, usr_lastname = $2, usr_email = $3, usr_password = $4, usr_address = $5, usr_country = $6, usr_city = $7, usr_postal_code = $8, usr_phone_number = $9, usr_role = $10 WHERE usr_id = $11";
        pg_prepare($this->connection, "", $query);
        $result = pg_execute($this->connection, "", array(
            $params->firstname,
            $params->lastname,
            $params->email,
            $params->password,
            $params->address,
            $params->country,
            $params->city,
            $params->postal_code,
            $params->phone_number,
            $params->role,
            $params->id
        ));

        if (!$result) {
            throw new Exception("Failed to update user", 500);
        }
    }

    public function delete($id) {
        $query = "DELETE FROM utilisateur WHERE usr_id = $id";
        $result = pg_query($this->connection, $query);

        if (!$result) {
            throw new Exception("Failed to delete user", 500);
        }
    }
}
?>
