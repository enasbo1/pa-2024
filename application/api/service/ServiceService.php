<?php
namespace service;

use Exception;
use shared\ModelType;
use shared\Verif;


class ServiceService implements ModelType {

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
			"type" => "r :M,150",
			"description" => "r :M,255",
			"tarif" => "r !int",
			"date_debut" => "r :d,MDY",
			"date_fin" => "r :d,MDY",
			"note" => "r !int",
			"fiche" => "r :M,65535",
			"coef" => "r !int",
			"actif" => ""
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
			"type" => isset($params->type)?$params->type:null,
			"description" => isset($params->description)?$params->description:null,
			"tarif" => isset($params->tarif)?$params->tarif:null,
			"date_debut" => isset($params->date_debut)?$params->date_debut:null,
			"date_fin" => isset($params->date_fin)?$params->date_fin:null,
			"note" => isset($params->note)?$params->note:null,
			"fiche" => isset($params->fiche)?$params->fiche:null,
			"coef" => isset($params->coef)?$params->coef:null,
            "actif" => isset($params->actif)?$params->actif:true
        ]);
    }
}

