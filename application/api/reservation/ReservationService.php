<?php
namespace reservation;

use Exception;
use shared\ModelType;
use shared\Verif;

include_once "./shared/ModelType.php";

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
			"total_location" => $params->total_location,
			"total_abonnement" => $params->total_abonnement,
			"total_frais" => $params->total_frais,
			"id_APPARTEMENT" => $params->id_APPARTEMENT,
			"id_UTILISATEUR" => $params->id_UTILISATEUR
        ];
    }
}

