<?php
namespace message;

use Exception;
use shared\ModelType;
use shared\Verif;

include_once "./shared/ModelType.php";

class MessageService implements ModelType {

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
			"date_envoie" => "!int",
			"texte" => "r !int",
			"id_SERVICE_UTILISEE" => "!int",
			"id_RESERVATION" => "!int",
			"id_TICKET" => "!int",
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
			"date_envoie" => $params->date_envoie,
			"texte" => $params->texte,
			"id_SERVICE_UTILISEE" => $params->id_SERVICE_UTILISEE,
			"id_RESERVATION" => $params->id_RESERVATION,
			"id_TICKET" => $params->id_TICKET,
			"id_UTILISATEUR" => $params->id_UTILISATEUR
        ];
    }
}

