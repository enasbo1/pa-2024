<?php
namespace reservation;

use Exception;
use shared\ModelType;
use shared\Verif;


class ReservationService implements ModelType {

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
			"total_location" => "r !int",
			"total_abonnement" => "!int",
			"total_frais" => "!int",
			"id_APPARTEMENT" => "r !int",
			"id_UTILISATEUR" => "r !int"
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
			"total_location" => isset($params->total_location)?$params->total_location:null,
			"total_abonnement" => isset($params->total_abonnement)?$params->total_abonnement:null,
			"total_frais" => isset($params->total_frais)?$params->total_frais:null,
			"id_APPARTEMENT" => isset($params->id_APPARTEMENT)?$params->id_APPARTEMENT:null,
			"id_UTILISATEUR" => isset($params->id_UTILISATEUR)?$params->id_UTILISATEUR:null
        ]);
    }
}

