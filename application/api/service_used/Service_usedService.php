<?php
namespace service_used;

use Exception;
use shared\ModelType;
use shared\Verif;


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
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"date_modif" => "!int",
			"date_debut" => "!int",
			"lieu" => "r :M,60",
			"id_RESERVATION" => "r !int",
			"id_SERVICE" => "r !int",
			"id_UTILISATEUR" => "r !int"
        ]);
        if (
            $valid != "validated"
        ) {
            throw new Exception("Bad Request : ". $valid["message"], 400);
        }

        return $arr_params;
    }

    /**
     * @throws Exception
     */
    public function toArray(object $params): array
    {
        return array_filter([
			"id" => isset($params->id)?$params->id:null,
			"date_modif" => isset($params->date_modif)?$params->date_modif:null,
			"date_debut" => isset($params->date_debut)?$params->date_debut:null,
			"lieu" => isset($params->lieu)?$params->lieu:null,
			"id_RESERVATION" => isset($params->id_RESERVATION)?$params->id_RESERVATION:null,
			"id_SERVICE" => isset($params->id_SERVICE)?$params->id_SERVICE:null,
			"id_UTILISATEUR" => isset($params->id_UTILISATEUR)?$params->id_UTILISATEUR:null
        ]);
    }
}

