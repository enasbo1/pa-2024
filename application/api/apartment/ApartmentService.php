<?php
namespace apartment;

use Exception;
use shared\ModelType;
use shared\Verif;

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
        $valid = Verif::verification($this->toArray($params),[
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
			"ville" => $params->ville,
			"code_postal" => $params->code_postal,
			"prix_fixe_nuit" => $params->prix_fixe_nuit,
			"type_gestion" => $params->type_gestion,
			"duree" => $params->duree,
			"type_de_bien" => $params->type_de_bien,
			"logement_entier" => $params->logement_entier,
			"nb_chambre" => $params->nb_chambre,
			"nb_occupant_max" => $params->nb_occupant_max,
			"surface" => $params->surface,
			"horaire_contact" => $params->horaire_contact,
			"id_UTILISATEUR" => $params->id_UTILISATEUR
        ];
    }
}

