<?php
namespace apartment;

use Exception;
use shared\Formater;
use shared\Repository;

require_once 'ApartmentService.php';

class ApartmentRepository extends Repository {
    private string $getQuery =
"SELECT
    a.id as id,
    a.ville as ville,
    a.code_postal,
    prix_fixe_nuit,
    type_gestion,
    duree,
    type_de_bien,
    logement_entier,
    nb_chambre,
    nb_occupant_max,
    surface,
    horaire_contact,
    u.id as utilisateur__id,
    prenom as utilisateur__prenom,
    nom as utilisateur__nom,
    mail as utilisateur__mail
from appartement a
inner join utilisateur u on u.id = a.id_utilisateur 
";
    public function __construct()
    {
        parent::__construct("APPARTEMENT", new ApartmentService());
    }

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $apartment = [];
        $result = $this->query($this->getQuery, [], "no apartments for this user");
        foreach($result as $row) {
            $apartment[] = Formater::prepareGet($row);
        }

        return $apartment;
    }

    /**
     * @throws Exception
     */
    public function findById(int $id): array
    {
        $apartment = [];
        $result = $this->query($this->getQuery . 'where a.id=$1', ["id" => $id], "no apartments for this user");
        foreach($result as $row) {
            $apartment[] = Formater::prepareGet($row);
        }

        return $apartment;    }

    /**
     * @throws Exception
     */
    public function save($params): void
    {
        $this->create($params, "unable to create apartment");
    }

    public function update($params, string $error = "unexciting apartment could not be updated"): Exception|bool
    {
        return parent::update($params, $error);
    }

    public function delete(int $id, string $error = "unexciting apartment cold not be deleted"): void
    {
        parent::delete($id, $error);
    }
}
