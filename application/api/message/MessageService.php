<?php
namespace message;

use Exception;
use shared\ModelType;
use shared\Verif;


class MessageService implements ModelType {

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
			"date_envoie" => ":d,MDY",
			"texte" => "r",
			"id_SERVICE_UTILISEE" => "!int",
			"id_RESERVATION" => "!int",
			"id_TICKET" => "!int",
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
			"date_envoie" => isset($params->date_envoie)?$params->date_envoie:null,
			"texte" => isset($params->texte)?$params->texte:null,
			"id_SERVICE_UTILISEE" => isset($params->id_SERVICE_UTILISEE)?$params->id_SERVICE_UTILISEE:null,
			"id_RESERVATION" => isset($params->id_RESERVATION)?$params->id_RESERVATION:null,
			"id_TICKET" => isset($params->id_TICKET)?$params->id_TICKET:null,
			"id_UTILISATEUR" => isset($params->id_UTILISATEUR)?$params->id_UTILISATEUR:null
        ]);
    }
}

