<?php
namespace ticket;

use Exception;
use shared\ModelType;
use shared\Verif;

include_once "./shared/ModelType.php";

class TicketService implements ModelType {

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
			"sujet" => "r :M,80",
			"description" => "r :M,1048576",
			"date_creation" => "r !int",
			"date_modif" => "r !int",
			"id_traitant" => "!int",
			"id_RESERVATION" => "!int",
			"id_SERVICE" => "!int",
			"id_MESSAGE" => "!int",
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
			"sujet" => $params->sujet,
			"description" => $params->description,
			"date_creation" => $params->date_creation,
			"date_modif" => $params->date_modif,
			"id_traitant" => $params->id_traitant,
			"id_RESERVATION" => $params->id_RESERVATION,
			"id_SERVICE" => $params->id_SERVICE,
			"id_MESSAGE" => $params->id_MESSAGE,
			"id_UTILISATEUR" => $params->id_UTILISATEUR
        ];
    }
}

