<?php
namespace entreprise;

use Exception;
use shared\ModelType;
use shared\Verif;


class EntrepriseService implements ModelType {

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
			"nom" => "r :M,200",
			"description" => "r :M,1048576",
			"logo" => ":M,255"
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
			"nom" => isset($params->nom)?$params->nom:null,
			"description" => isset($params->description)?$params->description:null,
			"logo" => isset($params->logo)?$params->logo:null
        ]);
    }
}

