<?php
namespace ticket;

use Exception;
use shared\ModelType;
use shared\Verif;


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
    public function isValidType(object $params): array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"id" => "!int",
			"sujet" => "r :M,80",
			"description" => "r :M,1048576",
			"date_creation" => "r !int",
			"date_modif" => "r !int",
			"id_traitant" => "!int",
			"id_RESERVATION" => "!int",
			"id_SERVICE" => "!int",
			"id_MESSAGE" => "!int",
			"id_utilisateur" => "r !int"
        ]);
        if (
            $valid != "validated"
        ) {
            throw new Exception("Bad Request : ". $valid["message"], 400);
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
			"sujet" => isset($params->sujet)?$params->sujet:null,
			"description" => isset($params->description)?$params->description:null,
			"date_creation" => isset($params->date_creation)?$params->date_creation:null,
			"date_modif" => isset($params->date_modif)?$params->date_modif:null,
			"id_traitant" => isset($params->id_traitant)?$params->id_traitant:null,
			"id_RESERVATION" => isset($params->id_RESERVATION)?$params->id_RESERVATION:null,
			"id_SERVICE" => isset($params->id_SERVICE)?$params->id_SERVICE:null,
			"id_MESSAGE" => isset($params->id_MESSAGE)?$params->id_MESSAGE:null,
			"id_utilisateur" => isset($params->id_utilisateur)?$params->id_utilisateur:null
        ]);
    }
}

