<?php
namespace service;

use Exception;
use shared\ModelType;
use shared\Verif;

include_once "./shared/ModelType.php";

class ServiceService implements ModelType {

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
			"   id" => "!int",
			"   type" => "r :M,150",
			"   description" => "r :M,255",
			"   tarif" => "r !int",
			"   date_debut" => "r !int",
			"   date_fin" => "r !int",
			"   note" => "r !int",
			"   fiche" => "r :M,65535",
			"   coef" => "r !int"
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
			"   id" => $params->   id,
			"   type" => $params->   type,
			"   description" => $params->   description,
			"   tarif" => $params->   tarif,
			"   date_debut" => $params->   date_debut,
			"   date_fin" => $params->   date_fin,
			"   note" => $params->   note,
			"   fiche" => $params->   fiche,
			"   coef" => $params->   coef
        ];
    }
}

