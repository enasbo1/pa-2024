<?php
namespace service_used;

use Exception;
use shared\ModelType;
use shared\Verif;


class Service_usedService implements ModelType {

    /**
     * @throws Exception
     */
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"date_modif" => ":d,MDY",
			"date_debut" => "r :d,MDY",
			"id_RESERVATION" => "r !int",
			"id_SERVICE_ENTREPRISE" => "r !int",
			"id_UTILISATEUR" => "r !int"
        ]);
        if (
            $valid != "validated"
        ) {
            throw new Exception(json_encode($valid),400);
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
			"id_RESERVATION" => isset($params->id_RESERVATION)?$params->id_RESERVATION:null,
			"id_SERVICE_ENTREPRISE" => isset($params->id_SERVICE_ENTREPRISE)?$params->id_SERVICE_ENTREPRISE:null,
			"id_UTILISATEUR" => isset($params->id_UTILISATEUR)?$params->id_UTILISATEUR:null
        ]);
    }
}