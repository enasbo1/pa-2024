<?php

class ReservationService {

    public function prepareSave($params) {
        if (
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

        return $params;
    }

    public function prepareUpdate($params) {
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

        return $params;
    }
}
?>
