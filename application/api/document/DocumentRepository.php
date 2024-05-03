<?php
namespace document;

use Exception;
use shared\Repository;

require_once 'DocumentService.php';

class DocumentRepository extends Repository {
    public function __construct()
    {
        parent::__construct("DOCUMENT", new DocumentService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $document = [];
        $result = $this->readAll("unable to find any document");

        foreach($result as $row) {
            $document[] = $row;
        }

        return $document;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        return $this->read($id, "document not found");
    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create document");
    }

    public function update($params, string $error = "unexciting document could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting document cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
