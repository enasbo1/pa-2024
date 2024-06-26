<?php
namespace sanction_spec;

use Exception;
use shared\ModelType;
use shared\Verif;


class Sanction_specService implements ModelType {

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
			"raison" => "r :M,50",
			"id_raison" => "!int",
			"type" => "r :M,100",
			"restriction" => "r !int",
			"domaine" => "r :M,50"
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
			"raison" => isset($params->raison)?$params->raison:null,
			"id_raison" => isset($params->id_raison)?$params->id_raison:null,
			"type" => isset($params->type)?$params->type:null,
			"restriction" => isset($params->restriction)?$params->restriction:null,
			"domaine" => isset($params->domaine)?$params->domaine:null
        ]);
    }
}

