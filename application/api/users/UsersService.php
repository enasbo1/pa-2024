<?php
namespace users;

use Exception;
use shared\ModelType;

class UsersService implements ModelType {
    /**
     * @throws Exception
     */
    public function prepareSave(object $params): object
    {
        return $this->isValidType($params);
    }

    /**
     * @throws Exception
     */
    public function prepareUpdate(object $params): object {
        return $this->isValidType($params);
    }

    /**
     * @throws Exception
     */
    public function isValidType(object $params):object
    {
        if (
            !isset($params->prenom) ||
            !isset($params->nom) ||
            !isset($params->mail) ||
            !isset($params->mdp) ||
            !isset($params->adresse) ||
            !isset($params->pays) ||
            !isset($params->ville) ||
            !isset($params->code_postal) ||
            !isset($params->numero) ||
            !isset($params->role)
        ) {
            throw new Exception("Bad Request", 400);
        }
        $params->mdp = password_hash($params->mdp, PASSWORD_BCRYPT);

        return $params;
    }

    /**
     * @throws Exception
     */
    public function toArray(object $params): array
    {
        $params = $this->isValidType($params);
        return [
            "prenom"=> $params->prenom,
            "nom"   => $params->nom,
            "mail"  =>$params->mail,
            "mdp"   =>$params->mdp,
            "adresse" => $params->adresse,
            "pays"  => $params->pays,
            "ville" =>$params->ville,
            "code_postal" => $params->code_postal,
            "numero"=> $params->numero,
            "role" => $params->role
        ];
    }
}
