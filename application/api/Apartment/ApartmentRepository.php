<?php

require_once 'ApartmentService.php';

class ApartmentRepository {
    private $connection = null;

    public function __construct() {
        try {
            // Connexion à la base de données PostgreSQL
            $connectionString = "host=database port=5432 dbname=pa_unnamed user=unknown password=password";
            $this->connection = pg_connect($connectionString);
            if ($this->connection == null) {
                throw new Exception("Impossible de se connecter à la base de données.");
            }
        } catch (Exception $e) {
            throw new Exception("La connexion à la base de données a échoué : " . $e->getMessage());
        }
    }
    public function getAll() {
        $query = "SELECT * FROM APPARTEMENT";
        $result = pg_query($this->connection, $query);

        if (!$result) {
            throw new Exception(pg_last_error($this->connection));
        }

        $apartments = [];

        while ($row = pg_fetch_assoc($result)) {
            $apartments[] = $row;
        }

        return $apartments;
    }

    public function findById($id) {
        $query = "SELECT * FROM APPARTEMENT WHERE id = $id";
        $result = pg_query($this->connection, $query);

        $apartment = pg_fetch_assoc($result);

        if (!$apartment) {
            throw new Exception("Appartement non trouvé", 404);
        }

        return $apartment;
    }

    public function save($params) {
        $check = new ApartmentService();
        $params = $check->prepareSave($params);

        $query = "INSERT INTO APARTMENT (ville, code_postal, prix_fixe_nuit, type_gestion, duree, type_de_bien, logement_entier, nb_chambre, nb_occupant_max, surface, horaire_contact, id_UTILISATEUR) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";
        pg_prepare($this->connection, "", $query);
        $result = pg_execute($this->connection, "", array(
            $params->ville,
            $params->code_postal,
            $params->prix_fixe_nuit,
            $params->type_gestion,
            $params->duree,
            $params->type_de_bien,
            $params->logement_entier,
            $params->nb_chambre,
            $params->nb_occupant_max,
            $params->surface,
            $params->horaire_contact,
            $params->id_UTILISATEUR
        ));

        if (!$result) {
            throw new Exception("Erreur lors de l'insertion de l'appartement", 500);
        }
    }

    public function update($params) {
        $check = new ApartmentService();
        $params = $check->prepareUpdate($params);

        $query = "UPDATE APPARTEMENT SET ville = $1, code_postal = $2, prix_fixe_nuit = $3, type_gestion = $4, duree = $5, type_de_bien = $6, logement_entier = $7, nb_chambre = $8, nb_occupant_max = $9, surface = $10, horaire_contact = $11, id_UTILISATEUR = $12 WHERE id = $13";
        pg_prepare($this->connection, "", $query);
        $result = pg_execute($this->connection, "", array(
            $params->ville,
            $params->code_postal,
            $params->prix_fixe_nuit,
            $params->type_gestion,
            $params->duree,
            $params->type_de_bien,
            $params->logement_entier,
            $params->nb_chambre,
            $params->nb_occupant_max,
            $params->surface,
            $params->horaire_contact,
            $params->id_UTILISATEUR,
            $params->id
        ));

        if (!$result) {
            throw new Exception("Erreur lors de la mise à jour de l'appartement", 500);
        }
    }

    public function delete($id) {
        $query = "DELETE FROM APPARTEMENT WHERE id = $id";
        $result = pg_query($this->connection, $query);

        if (!$result) {
            throw new Exception("Erreur lors de la suppression de l'appartement", 500);
        }
    }
}
