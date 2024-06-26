<?php
namespace users;

use Exception;
use shared\ModelType;
use shared\Verif;


class UsersService implements ModelType {
    private const SECRET = "d5aatda&-dsgveskfe354/*-+44&";
    
    public static function hash_password(string $password){
        return hash_hmac('sha256',$password, UsersService::SECRET);
    }

    /**
     * @throws Exception
     */
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"prenom" => "r :M,30",
			"nom" => "r :M,100",
			"mail" => "r :M,100",
			"mdp" => "r :M,255",
			"adresse" => "r :M,255",
			"pays" => "r :M,50",
			"ville" => "r :M,50",
			"code_postal" => "r :e,5",
			"numero" => "r :e,10",
			"date_inscription" => "!int",
			"date_modification" => "!int",
			"role" => "r !int",
			"rang" => "!int",
			"token" => ":M,255",
			"id_ENTREPRISE" => "!int"
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
			"prenom" => isset($params->prenom)?$params->prenom:null,
			"nom" => isset($params->nom)?$params->nom:null,
			"mail" => isset($params->mail)?$params->mail:null,
			"mdp" => isset($params->mdp)?$this->hash_password($params->mdp):null,
			"adresse" => isset($params->adresse)?$params->adresse:null,
			"pays" => isset($params->pays)?$params->pays:null,
			"ville" => isset($params->ville)?$params->ville:null,
			"code_postal" => isset($params->code_postal)?$params->code_postal:null,
			"numero" => isset($params->numero)?$params->numero:null,
			"date_inscription" => isset($params->date_inscription)?$params->date_inscription:null,
			"date_modification" => isset($params->date_modification)?$params->date_modification:null,
			"role" => isset($params->role)?$params->role:null,
			"rang" => isset($params->rang)?$params->rang:null,
			"token" => isset($params->token)?$params->token:null,
			"id_ENTREPRISE" =>isset($params->id_ENTREPRISE)?$params->id_ENTREPRISE:null
        ]);
    }
}

