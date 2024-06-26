<?php
namespace reservation;

use Exception;
use shared\ModelType;
use shared\Verif;


class ReservationService implements ModelType {

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
			"total_location" => "r !int",
			"total_abonnement" => "!int",
			"date_fin" => "r :d,MDY",
			"date_debut" => "r :d,MDY",
			"total_frais" => "!int",
			"id_appartement" => "r !int",
			"id_utilisateur" => "r !int"
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
			"total_location" => isset($params->total_location)?$params->total_location:null,
			"total_abonnement" => isset($params->total_abonnement)?$params->total_abonnement:null,
			"date_fin" => isset($params->date_fin)?$params->date_fin:null,
			"date_debut" => isset($params->date_debut)?$params->date_debut:null,
			"total_frais" => isset($params->total_frais)?$params->total_frais:null,
			"id_appartement" => isset($params->id_appartement)?$params->id_appartement:null,
			"id_utilisateur" => isset($params->id_utilisateur)?$params->id_utilisateur:null
        ]);
    }
}

