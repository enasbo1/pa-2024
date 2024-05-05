<?php
namespace document;

use Exception;
use shared\ModelType;
use shared\Verif;


class DocumentService implements ModelType {

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
			"url_ci" => "r !url :M,255",
			"url_habilitation" => "r !url :M,255",
			"tarif" => "r !int",
			"id_UTILISATEUR" => "r :!int"
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
			"url_ci" => isset($params->url_ci)?$params->url_ci:null,
			"url_habilitation" => isset($params->url_habilitation)?$params->url_habilitation:null,
			"tarif" => isset($params->tarif)?$params->tarif:null,
			"id_UTILISATEUR" => isset($params->id_UTILISATEUR)?$params->id_UTILISATEUR:null
        ]);
    }
}

