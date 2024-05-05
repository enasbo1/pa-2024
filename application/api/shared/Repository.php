<?php
namespace shared;
use Exception;


class Repository
{
    public $connection = null;
    public string $modelName = "";

    public ModelType $modelType;

    /**
     * @throws Exception
     */
    public function __construct(string $modelName, ModelType $modelType)
    {
        $json_string = file_get_contents("./properties.json");
        $properties = json_decode($json_string,true);
        $this->modelName = $modelName;
        $this->modelType = $modelType;
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

    /**
     * @param object $params
     * @param string $error
     * @throws Exception
     */
    public function create(object $params, string $error = ""): void
    {
        $toquery = $this->modelType->isValidType($params);
        $this->post($this->modelName, $toquery);
    }

    /**
     * @param int $id
     * @param string $error
     * @return array
     * @throws Exception
     */
    public function read(int $id, string $error = ""):array{
        return $this->get($this->modelName, [], ["id" => $id], $error);
    }

    /**
     * @throws Exception
     */
    public function readAll(string $error = ""):array{
        return $this->get($this->modelName, [], [], $error);
    }

    /**
     * @throws Exception
     */
    public function update(object $params, string $error = ""): bool|Exception
    {
        if ($this->read($params->id)!=[]){
            $toquery = $this->modelType->toArray($params);
            return $this->update_abs($this->modelName, $toquery, ["id"=>$params->id], $error);
        }
        else{
            $error = ($error == "") ? "$this->modelName instance not found: " : $error;
            throw new Exception($error, 404);
        }
    }

    /**
     * @throws Exception
     */
    public function delete(int $id, string $error = ""): void
    {
        if ($this->read($id)!=[]){
            $this->delete_abs($this->modelName, "id", $id, $error);
        }
        else{
            $error = ($error == "") ? "$this->modelName instance not found: " : $error;
            throw new Exception($error, 404);
        }
    }

    public function delete_abs(String $table, string $attribute, string $value, string $error = ""): void
    {
        try{
            $q = 'DELETE FROM ' . strtoupper($table) . " WHERE  \"".$attribute."\" = $1";
            pg_prepare($this->connection, "", $q);
            pg_execute($this->connection, "", array($value));
        } catch (Exception $e) {
            $error = ($error == "") ? "$this->modelName instance delete failed: " : $error;
            throw new Exception($error . $e->getMessage(), 400);
        }

    }
    /**
     * @throws Exception
     */
    public function update_abs(string $table, array $updates, array $restrict, string $error = "")
    {
        try {
            $q = "UPDATE $table SET ";
            $i = 1;
            foreach ($updates as $col => $value) {
                $q .= $col . " = '" . $value . "'";
                if ($i < count($updates)) {
                    $q = $q . ",";
                }
                $i += 1;
            }

            $i = 1;
            foreach ($restrict as $key => $val) {
                if ($i == 1) {
                    $q .= " WHERE ";
                } else {
                    $q .= " AND ";
                }
                $q .= $key . ' = $' . $i;
                $i+=1;
            }
            pg_prepare($this->connection,"", $q);
            return pg_execute($this->connection,"", $restrict);
        } catch (Exception $e) {
            $error = ($error == "") ? "$this->modelName instance update failed: " : $error;
            throw new Exception($error . $e->getMessage(), 400);
        }
    }

    /**
     * @throws Exception
     */
    public function post(string $table, array $array, string $error = "")
    {
        try {
            $q = 'INSERT INTO ' . strtoupper($table) . ' (';
            $i = 1;
            foreach ($array as $key => $value) {
                $q = $q . $key;
                if ($i < count($array)) {
                    $q = $q . ",";
                }
                $i += 1;
            }

            $q = $q . ') VALUES (';
            $i = 1;
            foreach ($array as $key => $value) {
                $q = $q  . '$' . "$i";
                if (($i) < count($array)) {
                    $q = $q . ",";
                }
                $i += 1;
            }
            $q = $q . ')';
            pg_prepare($this->connection,"", $q);
            return pg_execute($this->connection,"", $array);
        } catch (Exception $e) {
            $error = ($error=="")?"$this->modelName instance creation failed: ":$error;
            throw new Exception($error . $e->getMessage(), 400);
        }
    }

    /**
     * @throws Exception
     */
    public function get(string $table, array $attributes, array $restrict, string $error = ""):array{
        try{
            $r = '';
            if ($attributes!==[]){
                $i = 1;
                foreach ($attributes as $att) {
                    $r .= '"' . $att . '"';
                    if ($i < count($attributes)) {
                        $r = $r . ",";
                    }
                    $i += 1;
                }
            }else{
                $r="*";
            }

            $q = "SELECT $r FROM $table ";
            $i = 1;
            foreach ($restrict as $key => $val) {
                if ($i == 1) {
                    $q .= " WHERE ";
                } else {
                    $q .= " AND ";
                }
                $q .= $key . ' = $' . $i;
                $i += 1;
            }
            pg_prepare($this->connection,"", $q);
            $elements = pg_execute($this->connection,"", $restrict);
            return pg_fetch_all($elements);
        }catch (Exception $e){
            $error = ($error=="")?"$this->modelName instance get failed: ":$error;
            throw new Exception($error . $e->getMessage(), 400);
        }

    }
}