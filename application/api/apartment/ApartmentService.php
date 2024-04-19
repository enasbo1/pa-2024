<?php

class ApartmentService {

    /**
     * @throws Exception
     */
    public function prepareSave($params) {
        return $this->isApartment($params);
    }

    /**
     * @throws Exception
     */
    public function prepareUpdate($params) {
        return $this->isApartment($params);

    }

    public function isApartment($params){
        if (
            !isset($params->id) ||
            !isset($params->ville) ||
            !isset($params->code_postal) ||
            !isset($params->prix_fixe_nuit) ||
            !isset($params->type_gestion) ||
            !isset($params->duree) ||
            !isset($params->type_de_bien) ||
            !isset($params->logement_entier) ||
            !isset($params->nb_chambre) ||
            !isset($params->nb_occupant_max) ||
            !isset($params->surface) ||
            !isset($params->horaire_contact) ||
            !isset($params->id_UTILISATEUR)
        ) {
            throw new Exception("Bad Request", 400);
        }

        return $params;
    }
}
