<?php
namespace service;

use Exception;
use shared\ModelType;
use shared\Verif;


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
            $valid != "validated"
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
        return array_filter([
			"   id" => isset($params->   id)?$params->   id:null,
			"   type" => isset($params->   type)?$params->   type:null,
			"   description" => isset($params->   description)?$params->   description:null,
			"   tarif" => isset($params->   tarif)?$params->   tarif:null,
			"   date_debut" => isset($params->   date_debut)?$params->   date_debut:null,
			"   date_fin" => isset($params->   date_fin)?$params->   date_fin:null,
			"   note" => isset($params->   note)?$params->   note:null,
			"   fiche" => isset($params->   fiche)?$params->   fiche:null,
			"   coef" => isset($params->   coef)?$params->   coef:null
        ]);
    }
}

