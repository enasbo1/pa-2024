<?php
namespace service_entreprise;

use Exception;
use shared\ModelType;
use shared\Verif;


class Service_entrepriseService implements ModelType {

    /**
     * @throws Exception
     */
    public function prepareSave(object $params): array {
        return $this->isValidType($params);
    }

    /**
     * @throws Exception
     */
    public function prepareUpdate(object $params): array {
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
			"tarif" => "r !int",
			"coef" => "!int",
			"id_SERVICE" => "r !int",
			"id_ENTREPRISE" => "r !int"
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
			"tarif" => isset($params->tarif)?$params->tarif:null,
			"coef" => isset($params->coef)?$params->coef:null,
			"id_SERVICE" => isset($params->id_SERVICE)?$params->id_SERVICE:null,
			"id_ENTREPRISE" => isset($params->id_ENTREPRISE)?$params->id_ENTREPRISE:null
        ]);
    }
}

