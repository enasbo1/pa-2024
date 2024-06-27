<?php
namespace service;

use Exception;
use shared\ModelType;
use shared\Verif;


class ServiceService implements ModelType {

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
			"type" => "r :M,150",
			"description" => "r :M,255",
			"note" => "r !int",
			"actif" => "",
			"form" => ""
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
			"type" => isset($params->type)?$params->type:null,
			"description" => isset($params->description)?$params->description:null,
			"note" => isset($params->note)?$params->note:null,
			"actif" => isset($params->actif)?$params->actif:true,
			"form" => isset($params->form)?$params->form:null
        ]);
    }
}

