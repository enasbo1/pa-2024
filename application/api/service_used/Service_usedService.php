<?php
namespace service_used;

use Exception;
use shared\ModelType;
use shared\Verif;

include_once "./shared/ModelType.php";

class Service_usedService implements ModelType {

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
			"date_modif" => "!int",
			"date_debut" => "!int",
			"lieu" => "r :M,60",
			"id_RESERVATION" => "r !int",
			"id_SERVICE" => "r !int",
			"id_UTILISATEUR" => "r !int"
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
			"date_modif" => $params->date_modif,
			"date_debut" => $params->date_debut,
			"lieu" => $params->lieu,
			"id_RESERVATION" => $params->id_RESERVATION,
			"id_SERVICE" => $params->id_SERVICE,
			"id_UTILISATEUR" => $params->id_UTILISATEUR
        ];
    }
}

