<?php
namespace reservation;

use Exception;
use shared\Formater;
use shared\Repository;

require_once 'ReservationService.php';

class ReservationRepository extends Repository {
    private string $getQuery =
        "SELECT
    a.id,
    total_location,
    total_abonnement,
    total_frais,
    date_debut,
    date_fin,
    a.id as appartement__id,
    a.ville as appartement__ville,
    a.code_postal as appartement__code_postal,
    u.id as utilisateur__id,
    u.prenom as utilisateur__prenom,
    u.nom as utilisateur__nom,
    u.mail as utilisateur__mail,
    propr.id as appartement__utilisateur__id,
    propr.prenom as appartement__utilisateur__prenom,
    propr.nom as appartement__utilisateur__nom,
    propr.mail as appartement__utilisateur__mail
from reservation r
inner join appartement a on a.id = r.id_appartement
inner join utilisateur propr on propr.id = a.id_utilisateur
inner join utilisateur u on u.id = r.id_utilisateur 
";
    public function __construct()
    {
        parent::__construct("RESERVATION", new ReservationService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $reservation = [];
        $result = $this->query($this->getQuery, [], "no reservation found");
        foreach($result as $row) {
            $reservation[] = Formater::prepareGet($row);
        }


        return $reservation;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $reservation = [];
        $result = $this->query($this->getQuery.'where r.id = $1', ['id' => $id], "no reservation found");
        foreach($result as $row) {
            $reservation[] = Formater::prepareGet($row);
        }

        return $reservation;
    }


    /**
     * @throws Exception
     */
    public function findFromVoyageur(int $id): array
    {
        $reservation = [];
        $result = $this->query($this->getQuery.'where u.id = $1', ['id' => $id], "no reservation found");
        foreach($result as $row) {
            $reservation[] = Formater::prepareGet($row);
        }

        return $reservation;
    }

    /**
     * @throws Exception
     */
    public function findByIdFromVoy(int $id_voy, int $id_res): array
    {
        $reservation = [];
        $result = $this->query($this->getQuery.'where u.id = $1 and r.id = $2', ['id_voy' => $id_voy, 'id_res'=> $id_res], "no reservation found");
        foreach($result as $row) {
            $reservation[] = Formater::prepareGet($row);
        }

        return $reservation;
    }


    /**
     * @throws Exception
     */
    public function findFromApartment(int $id): array
    {
        return $this->get($this->modelName,["date_debut", "date_fin"], ['id_appartement'=>$id]);
    }
    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create reservation");
    }

    public function update($params, string $error = "unexciting reservation could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting reservation cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
