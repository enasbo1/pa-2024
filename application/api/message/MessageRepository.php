<?php
namespace message;

use Exception;
use shared\Repository;

require_once 'MessageService.php';

class MessageRepository extends Repository {
    public function __construct()
    {
        parent::__construct("MESSAGE", new MessageService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $message = [];
        $result = $this->readAll("unable to find any message");

        foreach($result as $row) {
            $message[] = $row;
        }

        return $message;
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
