<?php
namespace apartment;

use Exception;
use shared\ModelType;
use shared\Verif;


class ApartmentService implements ModelType {

    /**
     * @throws Exception
     */
    public function prepareSave(object $params): array {
        return $this->isValidType($params);
    }

    /**
     * @throws Exception
     */
    public function prepareUpdate(object $params): array {
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
			"ville" => "r :M,50",
			"code_postal" => "r !int",
			"prix_fixe_nuit" => "r !int",
			"type_gestion" => "r :M,100",
			"duree" => "r !int",
			"type_de_bien" => "r :M,100",
			"logement_entier" => "r !int",
			"nb_chambre" => "r !int",
			"nb_occupant_max" => "r !int",
			"surface" => "r !int",
			"horaire_contact" => "r !int",
			"id_UTILISATEUR" => "r !int"
        ]);
        if (
            $valid != "validated"
        ) {
            throw new Exception(json_encode($valid),400);
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
			"ville" => isset($params->ville)?$params->ville:null,
			"code_postal" => isset($params->code_postal)?$params->code_postal:null,
			"prix_fixe_nuit" => isset($params->prix_fixe_nuit)?$params->prix_fixe_nuit:null,
			"type_gestion" => isset($params->type_gestion)?$params->type_gestion:null,
			"duree" => isset($params->duree)?$params->duree:null,
			"type_de_bien" => isset($params->type_de_bien)?$params->type_de_bien:null,
			"logement_entier" => isset($params->logement_entier)?$params->logement_entier:null,
			"nb_chambre" => isset($params->nb_chambre)?$params->nb_chambre:null,
			"nb_occupant_max" => isset($params->nb_occupant_max)?$params->nb_occupant_max:null,
			"surface" => isset($params->surface)?$params->surface:null,
			"horaire_contact" => isset($params->horaire_contact)?$params->horaire_contact:null,
			"id_UTILISATEUR" => isset($params->id_UTILISATEUR)?$params->id_UTILISATEUR:null
        ]);
    }
}

