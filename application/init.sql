CREATE TABLE UTILISATEUR(
   id SERIAL PRIMARY KEY,
   prenom VARCHAR(30), 
   nom VARCHAR(100),
   mail VARCHAR(100),
   mdp VARCHAR(255),
   adresse VARCHAR(255),
   pays VARCHAR(50),
   ville VARCHAR(50),
   code_postal INT,
   numero INT,
   date_inscription TIMESTAMP,
   date_modification TIMESTAMP,
   role INT, -- voyageur, client bailleur, prestataire, admin
   rang INT, -- VIP
   token VARCHAR(255) -- Jeton d'authentification de l'utilisateur
);

CREATE TABLE SERVICE(
   id serial PRIMARY KEY,
   type VARCHAR(150),
   description VARCHAR(255),
   tarif INT,
   date_debut TIMESTAMP,
   date_fin TIMESTAMP,
   note INT,
   fiche TEXT,
   coef INT -- variable pour le tarif quand il est variable
   url_json_formulaire VARCHAR(255)
);

CREATE TABLE DOCUMENT(
   id SERIAL PRIMARY KEY,
   url_ci VARCHAR(255),  -- url vers la carte d'identité
   url_habilitation VARCHAR(255), -- url vers d'autre doccument
   tarif INT,
   id_UTILISATEUR INT NOT NULL,
   CONSTRAINT id_UTILISATEUR FOREIGN KEY(id_UTILISATEUR) REFERENCES UTILISATEUR(id)
);

CREATE TABLE APPARTEMENT(
   id SERIAL,
   ville VARCHAR(50),
   code_postal INT,
   prix_fixe_nuit INT,
   type_gestion VARCHAR(100), -- le type de gestion
   duree INT,  -- la duree en jour
   type_de_bien VARCHAR(100), -- appartement ou maison
   logement_entier INT, -- logement complet ou chambre seulement
   nb_chambre INT,
   nb_occupant_max INT,
   surface INT, -- en mêtres carré
   horaire_contact INT,
   id_UTILISATEUR INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_UTILISATEUR) REFERENCES UTILISATEUR(id)
);

CREATE TABLE BANISSEMENT(
   id SERIAL,
   sujet VARCHAR(80),
   description TEXT,
   date_debut TIMESTAMP,
   date_fin TIMESTAMP,
   specification VARCHAR(200),  -- info suplémentaire pour admin
   id_UTILISATEUR INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_UTILISATEUR) REFERENCES UTILISATEUR(id)
);

CREATE TABLE ENTREPRISE(
   id SERIAL,
   nom VARCHAR(200),
   description TEXT,
   id_UTILISATEUR INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_UTILISATEUR) REFERENCES UTILISATEUR(id)
);

CREATE TABLE SERVICE_APPARTEMENT(
   id SERIAL,
   id_SERVICE INT NOT NULL,
   id_APPARTEMENT INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_SERVICE) REFERENCES SERVICE(id),
   FOREIGN KEY(id_APPARTEMENT) REFERENCES APPARTEMENT(id)
);

CREATE TABLE SERVICE_ENTREPRISE(
   id SERIAL,
   id_SERVICE INT NOT NULL,
   id_ENTREPRISE INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_SERVICE) REFERENCES SERVICE(id),
   FOREIGN KEY(id_ENTREPRISE) REFERENCES ENTREPRISE(id)
);

CREATE TABLE RESERVATION(
   id SERIAL,
   total_location INT,  -- prix de la location seulement appartement compris
   total_abonnement INT, -- prix total des abonnements
   total_frais INT, -- total
   id_APPARTEMENT INT NOT NULL,
   id_UTILISATEUR INT NOT NULL,
   date_debut TIMESTAMP NOT NULL,
   date_fin TIMESTAMP NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_APPARTEMENT) REFERENCES APPARTEMENT(id),
   FOREIGN KEY(id_UTILISATEUR) REFERENCES UTILISATEUR(id)
);

CREATE TABLE SERVICE_UTILISEE(
   id SERIAL,
   date_modif TIMESTAMP,
   date_debut TIMESTAMP,
   lieu VARCHAR(60),  -- zone
   id_RESERVATION INT NOT NULL,
   id_SERVICE INT NOT NULL,
   id_UTILISATEUR INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_RESERVATION) REFERENCES RESERVATION(id),
   FOREIGN KEY(id_SERVICE) REFERENCES SERVICE(id),
   FOREIGN KEY(id_UTILISATEUR) REFERENCES UTILISATEUR(id)
);
CREATE TABLE TICKET(
   id SERIAL,
   sujet VARCHAR(80),
   description TEXT,
   date_creation TIMESTAMP,
   date_modif TIMESTAMP,
   id_traitant INT,
   id_RESERVATION INT,
   id_SERVICE INT,
   id_MESSAGE INT,
   id_UTILISATEUR INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_traitant) REFERENCES UTILISATEUR(id),
   FOREIGN KEY(id_RESERVATION) REFERENCES RESERVATION(id),
   FOREIGN KEY(id_SERVICE) REFERENCES SERVICE_UTILISEE(id),
   FOREIGN KEY(id_UTILISATEUR) REFERENCES UTILISATEUR(id)
);

CREATE TABLE MESSAGE(
   id SERIAL,
   date_envoie TIMESTAMP,
   texte TEXT,
   id_SERVICE_UTILISEE INT,
   id_RESERVATION INT,
   id_TICKET INT,
   id_UTILISATEUR INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_SERVICE_UTILISEE) REFERENCES SERVICE_UTILISEE(id),
   FOREIGN KEY(id_RESERVATION) REFERENCES RESERVATION(id),
   FOREIGN KEY(id_TICKET) REFERENCES TICKET(id),
   FOREIGN KEY(id_UTILISATEUR) REFERENCES UTILISATEUR(id)
);

ALTER TABLE TICKET ADD CONSTRAINT id_MESSAGE FOREIGN KEY(id_MESSAGE) REFERENCES MESSAGE(id);
