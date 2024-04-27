<?php
namespace entrepise;

use Exception;
use shared\ModelType;
use shared\Verif;

include_once "./shared/ModelType.php";

class EntrepiseService implements ModelType {

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
			"nom" => "r :M,200",
			"description" => "r :M,1048576",
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
			"nom" => $params->nom,
			"description" => $params->description,
			"id_UTILISATEUR" => $params->id_UTILISATEUR
        ];
    }
}

