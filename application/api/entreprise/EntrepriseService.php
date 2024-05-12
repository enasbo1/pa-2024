<?php
namespace entreprise;

use Exception;
use shared\ModelType;
use shared\Verif;


class EntrepriseService implements ModelType {

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
			"nom" => "r :M,200",
			"description" => "r :M,1048576",
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
			"nom" => isset($params->nom)?$params->nom:null,
			"description" => isset($params->description)?$params->description:null,
			"id_UTILISATEUR" => isset($params->id_UTILISATEUR)?$params->id_UTILISATEUR:null
        ]);
    }
}

