<?php

class UsersService {

    /**
     * @throws Exception
     */
    public function prepareSave($params) {
        return $this->isUser($params);
    }

    /**
     * @throws Exception
     */
    public function prepareUpdate($params) {
        return $this->isUser($params);
    }

    public function isUser($params){
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
}
?>
