<?php

class ReservationService {

    /**
     * @throws Exception
     */
    public function prepareSave($params) {
        return $this->isReservation($params);
    }

    /**
     * @throws Exception
     */
    public function prepareUpdate($params) {
        return $this->isReservation($params);
    }

    /**
     * @throws Exception
     */
    public function isReservation($params){
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
