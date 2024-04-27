<?php
namespace document;

use Exception;
use shared\ModelType;
use shared\Verif;

include_once "./shared/ModelType.php";

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
    public function isValidType(object $params): object
    {
        $valid = Verif::verification($this->toArray($params),[
			"id" => "!int",
			"url_ci" => "r !url :M,255",
			"url_habilitation" => "r !url :M,255",
			"tarif" => "r !int",
			"id_UTILISATEUR" => "r :!int"
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
			"url_ci" => $params->url_ci,
			"url_habilitation" => $params->url_habilitation,
			"tarif" => $params->tarif,
			"id_UTILISATEUR" => $params->id_UTILISATEUR
        ];
    }
}

