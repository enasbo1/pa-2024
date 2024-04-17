<?php
namespace shared;
use Exception;

$json_string = file_get_contents("./properties.json");
$properties = json_decode($json_string,true);
class Repository
{
    public $connection = null;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        global $properties;
        try {
            $connectionString =
                "host=".$properties["host"].
                " port=".$properties["port"].
                " dbname=".$properties["db-name"].
                " user=".$properties["username"].
                " password=".$properties["password"];
            $this->connection = pg_connect($connectionString);
            if ($this->connection === false) {
                throw new Exception("Could not connect to database.");
            }
        } catch (Exception $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }
}