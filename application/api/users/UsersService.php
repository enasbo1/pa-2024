<?php
namespace users;

use Exception;
use shared\ModelType;
use shared\Verif;


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
			"id" => isset($params->id)?$params->id:null,
			"prenom" => isset($params->prenom)?$params->prenom:null,
			"nom" => isset($params->nom)?$params->nom:null,
			"mail" => isset($params->mail)?$params->mail:null,
			"mdp" => isset($params->mdp)?$params->mdp:null,
			"adresse" => isset($params->adresse)?$params->adresse:null,
			"pays" => isset($params->pays)?$params->pays:null,
			"ville" => isset($params->ville)?$params->ville:null,
			"code_postal" => isset($params->code_postal)?$params->code_postal:null,
			"numero" => isset($params->numero)?$params->numero:null,
			"date_inscription" => isset($params->date_inscription)?$params->date_inscription:null,
			"date_modification" => isset($params->date_modification)?$params->date_modification:null,
			"role" => isset($params->role)?$params->role:null,
			"rang" => isset($params->rang)?$params->rang:null,
			"token" => isset($params->token)?$params->token:null
        ]);
    }
}

