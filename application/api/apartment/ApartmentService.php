<?php
namespace apartment;
use Exception;
use shared\ModelType;

include_once "./shared/ModelType.php";

class ApartmentService implements ModelType {

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
        if (
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

    /**
     * @throws Exception
     */
    public function toArray(object $params): array
    {
        $params = $this->isValidType($params);
        return[
            "ville"         => $params->ville,
            "code_postal"   => $params->code_postal,
            "prix_fixe_nuit" => $params->prix_fixe_nuit,
            "type_gestion"  => $params->type_gestion,
            "duree"         => $params->duree,
            "type_de_bien"  => $params->type_de_bien,
            "logement_entier" => $params->logement_entier,
            "nb_chambre"    => $params->nb_chambre,
            "nb_occupant_max" => $params->nb_occupant_max,
            "surface"       => $params->surface,
            "horaire_contact" => $params->horaire_contact,
            "id_utilisateur" => $params->id_UTILISATEUR
        ];
    }
}
