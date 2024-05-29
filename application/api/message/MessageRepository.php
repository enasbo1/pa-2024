<?php
namespace message;

use Exception;
use shared\Formater;
use shared\Repository;

require_once 'MessageService.php';

class MessageRepository extends Repository {
    private string $getQuery =
"SELECT m.id,
date_envoie,
texte,
id_service_utilisee,
id_reservation,
id_ticket,
id_utilisateur as utilisateur__id,
u.nom as utilisateur__nom,
u.prenom as utilisateur__prenom
from message m
inner join public.utilisateur u on u.id = m.id_utilisateur ";

    public function __construct()
    {
        parent::__construct("MESSAGE", new MessageService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $service_used = [];
        $result = $this->query($this->getQuery, [], "messages not found");
        foreach($result as $row) {
            $service_used[] = Formater::prepareGet($row);
        }

        return $service_used;
    }

    public function findByService_used(int $id): array
    {
        $service_used = [];
        $result = $this->query($this->getQuery."where id_service_utilisee=$1", ["id" => $id], "messages not found");
        foreach($result as $row) {
            $service_used[] = Formater::prepareGet($row);
        }

        return $service_used;
    }

    public function findByReservation(int $id): array
    {
        $service_used = [];
        $result = $this->query($this->getQuery."where id_reservation=$1", ["id" => $id], "messages not found");
        foreach($result as $row) {
            $service_used[] = Formater::prepareGet($row);
        }

        return $service_used;
    }


    public function findByTicket(int $id): array
    {
        $service_used = [];
        $result = $this->query($this->getQuery."where id_tiket=$1", ["id" => $id], "messages not found");
        foreach($result as $row) {
            $service_used[] = Formater::prepareGet($row);
        }

        return $service_used;
    }
    
    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "message not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create message");
    }

    public function update($params, string $error = "unexciting message could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting message cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
