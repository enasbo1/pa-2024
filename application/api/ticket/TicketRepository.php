<?php
namespace ticket;

use Exception;
use shared\Formater;
use shared\Repository;

require_once 'TicketService.php';

class TicketRepository extends Repository {
    private string $getQuery =
"select
    t.id,
    sujet,
    description,
    date_creation,
    date_modif,
    id_traitant,
    id_reservation,
    id_service,
    id_message,
    u.id as utilisateur__id,
    u.nom as utilisateur__nom,
    u.prenom as utilisateur__prenom
from ticket t
inner join public.utilisateur u on u.id = t.id_utilisateur ";

    public function __construct()
    {
        parent::__construct("TICKET", new TicketService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $ticket = [];
        $result = $this->query($this->getQuery, [], "no ticket found");

        foreach($result as $row) {
            $ticket[] =Formater::prepareGet($row);
        }

        return $ticket;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $ticket = [];
        $result = $this->query($this->getQuery."where t.id=$1", ["id" => $id], "not existing ticket can't be found");
        foreach($result as $row) {
            $ticket[] = Formater::prepareGet($row);
        }

        return $ticket;    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create ticket");
    }

    public function update($params, string $error = "unexciting ticket could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting ticket cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
