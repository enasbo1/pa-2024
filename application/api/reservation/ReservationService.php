<?php
namespace reservation;
use Exception;
use shared\ModelType;

class ReservationService implements ModelType {

    /**
     * @throws Exception
     */
    public function prepareSave(object $params):object {
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
        if (
            !isset($params->id) ||
            !isset($params->startDate) ||
            !isset($params->endDate) ||
            !isset($params->client) ||
            !isset($params->apartment) ||
            !isset($params->price) ||
            !isset($params->total_location) || // Ajout du champ total_location
            !isset($params->total_abonnement) || // Ajout du champ total_abonnement
            !isset($params->total_frais) // Ajout du champ total_frais
        ) {
            throw new Exception("Bad Request", 400);
        }

        return $params;    }

    public function toArray(object $params): array
    {
        return [
            "startDate" => $params->startDate,
            "endDate"   => $params->endDate,
            "id_utilisateur" => $params->client,
            "id_appartement" => $params->apartment,
            "total_location" => $params->total_location
        ];
    }
}

