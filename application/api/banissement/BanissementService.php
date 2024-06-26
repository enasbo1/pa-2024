<?php
namespace banissement;

use Exception;
use shared\ModelType;
use shared\Verif;


class BanissementService implements ModelType {

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
			"sujet" => "r :M,80",
			"description" => "r :M,1048576",
			"date_debut" => "r :d,MDY",
			"date_fin" => "r :d,MDY",
			"id_sanction_spec" => "r !int",
			"id_utilisateur" => "r !int"
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
			"sujet" => isset($params->sujet)?$params->sujet:null,
			"description" => isset($params->description)?$params->description:null,
			"date_debut" => isset($params->date_debut)?$params->date_debut:null,
			"date_fin" => isset($params->date_fin)?$params->date_fin:null,
			"id_sanction_spec" => isset($params->id_sanction_spec)?$params->id_sanction_spec:null,
			"id_utilisateur" => isset($params->id_utilisateur)?$params->id_utilisateur:null
        ]);
    }
}

