<?php
namespace users;

use Exception;
use shared\ModelType;
use shared\Verif;

include_once "./shared/ModelType.php";

class UsersService implements ModelType {

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
			"prenom" => "r :M,30",
			"nom" => "r :M,100",
			"mail" => "r :M,100",
			"mdp" => "r :M,255",
			"adresse" => "r :M,255",
			"pays" => "r :M,50",
			"ville" => "r :M,50",
			"code_postal" => "r !int",
			"numero" => "r !int",
			"date_inscription" => "!int",
			"date_modification" => "!int",
			"role" => "r !int",
			"rang" => "!int",
			"token" => ":M,255"
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
			"prenom" => $params->prenom,
			"nom" => $params->nom,
			"mail" => $params->mail,
			"mdp" => $params->mdp,
			"adresse" => $params->adresse,
			"pays" => $params->pays,
			"ville" => $params->ville,
			"code_postal" => $params->code_postal,
			"numero" => $params->numero,
			"date_inscription" => $params->date_inscription,
			"date_modification" => $params->date_modification,
			"role" => $params->role,
			"rang" => $params->rang,
			"token" => $params->token
        ];
    }
}

