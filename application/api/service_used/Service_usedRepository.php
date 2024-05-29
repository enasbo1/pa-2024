<?php
namespace service_used;

use Exception;
use shared\Formater;
use shared\Repository;

require_once 'Service_usedService.php';

class Service_usedRepository extends Repository {
    private string $getQuery = 
"SELECT
    su.id as id,
    su.date_modif as date_modif,
    su.date_debut as date_debut,
    su.id_reservation as reservation__id_reservation,
    a.ville as reservation__ville,
    a.id as reservation__id_appartement,
    r.id_utilisateur as utilisateur__id,
    u.nom as utilisateur__nom,
    u.prenom as utilisateur__prenom,
    u.mail as utilisateur__mail,
    se.id_service as service__id,
    e.nom as entreprise__nom,
    e.logo as entreprise__logo,
    se.id_entreprise as entreprise__id,
    type as service__type,
    s.description as service__descriprion,
    tarif as service__tarif,
    s.date_debut as service__date_debut,
    s.date_fin as service__date_fin,
    note as service__note,
    fiche as service__fiche,
    coef as service__coef
from service_utilisee su
    inner join service_entreprise se on su.id_service_entreprise = se.id
    inner join service s on s.id = se.id_service
    inner join reservation r on su.id_reservation = r.id
    inner join appartement a on a.id = r.id_appartement
    inner join entreprise e on se.id_entreprise = e.id
    inner join utilisateur u on u.id = r.id_utilisateur
";



    public function __construct()
    {
        parent::__construct("SERVICE_UTILISEE", new Service_usedService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $service_used = [];
        $result = $this->query($this->getQuery, [], "no service_used found");

        foreach($result as $row) {
            $service_used[] =Formater::prepareGet($row);
        }

        return $service_used;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $service_used = [];
        $result = $this->query($this->getQuery."where su.id=$1", ["id" => $id], "no services for this user");
        foreach($result as $row) {
            $service_used[] = Formater::prepareGet($row);
        }

        return $service_used;
    }

    public function findByService(int $id): array
    {
        $service_used = [];
        $result = $this->query($this->getQuery."where s.id=$1", ["id" => $id], "service_used not found");
        foreach($result as $row) {
            $service_used[] = Formater::prepareGet($row);
        }

        return $service_used;
    }

    public function findByLocation(int $id): array{
        $service_used = [];
        $result = $this->query($this->getQuery."where a.id=$1", ["id" => $id], "service_used not found");
        foreach($result as $row) {
            $service_used[] = Formater::prepareGet($row);
        }

        return $service_used;
    }

    public function findByUser(int $id): array{
        $service_used = [];
        $result = $this->query($this->getQuery."where u.id=$1", ["id" => $id],"service_used not found");
        foreach($result as $row) {
            $service_used[] = Formater::prepareGet($row);
        }


        return $service_used;
    }


    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create service_used");
    }

    public function update($params, string $error = "unexciting service_used could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting service_used cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
