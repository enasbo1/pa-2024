<?php
namespace service_apartment;

use Exception;
use shared\ModelType;
use shared\Verif;


class Service_apartmentService implements ModelType {

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
			"id_SERVICE_ENTREPRISE" => "r !int",
			"id_APPARTEMENT" => "r !int"
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
			"id_SERVICE_ENTREPRISE" => isset($params->id_SERVICE_ENTREPRISE)?$params->id_SERVICE_ENTREPRISE:null,
			"id_APPARTEMENT" => isset($params->id_APPARTEMENT)?$params->id_APPARTEMENT:null
        ]);
    }
}

