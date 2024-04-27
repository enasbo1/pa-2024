<?php
namespace test;

use Exception;
use shared\ModelType;

include_once "./shared/ModelType.php";

class TestService implements ModelType {

    /**
     * @throws Exception
     */
    public function prepareSave(object $params): object {
        return $this->isValidType($params);
    }

    /**
     * @throws Exception
     */
    public function prepareUpdate(object $params):object {
        return $this->isValidType($params);

    }

    /**
     * @throws Exception
     */
    public function isValidType(object $params): object
    {
        if (
			!isset($params->name) 
        ) {
            throw new Exception("Bad Request", 400);
        }

        return $params;
    }

    /**
     * @throws Exception
     */
    public function toArray(object $params): array
    {
        $params = $this->isValidType($params);
        return[
			"name" => $params->name
        ];
    }
}

