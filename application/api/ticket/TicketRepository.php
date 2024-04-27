<?php
namespace ticket;

use Exception;
use shared\Repository;

require_once 'TicketService.php';
include_once './shared/Repository.php';

class TicketRepository extends Repository {
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
        $result = $this->readAll("unable to find any ticket");

        foreach($result as $row) {
            $ticket[] = $row;
        }

        return $ticket;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "ticket not found");
    }

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

    public function delete(int $id, string $error = "unexciting {{name}} cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
