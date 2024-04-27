<?php
namespace service_apartment;

use Exception;
use shared\ModelType;
use shared\Verif;

include_once "./shared/ModelType.php";

class Service_apartmentService implements ModelType {

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
        $valid = Verif::verification($this->toArray($params),[
			"id" => "!int",
			"id_SERVICE" => "r !int",
			"id_APPARTEMENT" => "r !int"
        ]);
        if (
            $valid == "validated"
        ) {
            throw new Exception("Bad Request : ". $valid["message"], 400);
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
			"id" => $params->id,
			"id_SERVICE" => $params->id_SERVICE,
			"id_APPARTEMENT" => $params->id_APPARTEMENT
        ];
    }
}

