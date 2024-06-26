create table service
(
    id serial primary key,
    type varchar(150),
    description varchar(255),
    note integer,
    url_json_formulaire varchar(255),
    actif boolean,
    form TEXT
);


create table form_field (
    id serial primary key,
    name varchar(150) not null,
    title varchar(150),
    sclass varchar(150),
    type varchar(50) not null,
    placeholder varchar(255),
    time boolean,
    default_value varchar(255),
    instruction text,
    reg_error text, -- JSON format
    choices text, -- JSON format
    _value varchar(255),
    _values text, -- JSON format
    max date,
    min date,
    step integer,
    number_limit_min integer,
    number_limit_max integer
);


create table form_rubric (
    id serial primary key,
    title varchar(150)
);

-- Table de jonction entre form_rubric et form_field
create table form_rubric_fields (
    rubric_id integer references form_rubric(id) on delete cascade,
    field_id integer references form_field(id) on delete cascade,
    primary key (rubric_id, field_id)
);


create table form_step (
    id serial primary key,
    title varchar(150)
);

-- Table de jonction entre form_step et form_rubric
create table form_step_rubrics (
    step_id integer references form_step(id) on delete cascade,
    rubric_id integer references form_rubric(id) on delete cascade,
    primary key (step_id, rubric_id)
);

-- Table de jonction entre service et form_step
create table service_form_steps (
    service_id integer references service(id) on delete cascade,
    step_id integer references form_step(id) on delete cascade,
    primary key (service_id, step_id)
);


create table entreprise
(
    id serial primary key,
    nom varchar(200),
    description text,
    logo varchar(255)
);

create table utilisateur
(
    id serial primary key,
    prenom varchar(30),
    nom varchar(100),
    mail varchar(100) unique,
    mdp varchar(255),
    adresse varchar(255),
    pays varchar(50),
    ville varchar(50),
    code_postal integer,
    numero integer,
    date_inscription timestamp,
    date_modification timestamp,
    role integer,
    rang integer,
    token varchar(255),
    id_entreprise integer references entreprise
);

create table document
(
    id serial primary key,
    url_ci varchar(255),
    url_habilitation varchar(255),
    tarif integer,
    id_utilisateur integer not null references utilisateur
);

create table appartement
(
    id serial primary key,
    ville varchar(50),
    code_postal integer,
    prix_fixe_nuit integer,
    type_gestion varchar(100),
    duree integer,
    type_de_bien varchar(100),
    logement_entier integer,
    nb_chambre integer,
    nb_occupant_max integer,
    surface integer,
    horaire_contact integer,
    id_utilisateur integer not null references utilisateur
);

create table sanction_spec
(
    id serial primary key,
    raison varchar(50),
    id_raison integer,
    type varchar(100),
    restriction integer,
    domaine varchar(50)
);

create table banissement
(
    id serial primary key,
    sujet varchar(80),
    description text,
    date_debut timestamp,
    date_fin timestamp,
    id_sanction_spec integer not null references sanction_spec,
    id_utilisateur integer not null references utilisateur
);

create table service_entreprise
(
    id serial primary key,
    tarif integer,
    coef integer,
    id_service integer not null references service,
    id_entreprise integer not null references entreprise
);

create table service_appartement
(
    id serial primary key,
    id_appartement integer not null references appartement,
    id_service_entreprise integer default 1 not null references service_entreprise
);

create table reservation
(
    id serial primary key,
    total_location integer,
    total_abonnement integer,
    total_frais integer,
    id_appartement integer not null references appartement,
    id_utilisateur integer not null references utilisateur,
    date_debut timestamp not null,
    date_fin timestamp not null
);

create table service_utilisee
(
    id serial primary key,
    date_modif timestamp,
    date_debut timestamp,
    date_fin timestamp,
    fiche text,
    form TEXT,
    id_reservation integer not null references reservation,
    id_utilisateur integer not null references utilisateur,
    id_service_entreprise integer default 1 not null references service_entreprise
);

create table ticket
(
    id serial primary key,
    sujet varchar(80),
    description text,
    date_creation timestamp,
    date_modif timestamp,
    id_traitant integer references utilisateur,
    id_reservation integer references reservation,
    id_service integer references service_utilisee,
    id_message integer,
    id_utilisateur integer not null references utilisateur
);

create table message
(
    id serial primary key,
    date_envoie timestamp,
    texte text,
    id_service_utilisee integer references service_utilisee,
    id_reservation integer references reservation,
    id_ticket integer references ticket,
    id_utilisateur integer not null references utilisateur
);

alter table ticket
    add constraint id_message
        foreign key (id_message) references message;

-- Suppression des données existantes
TRUNCATE TABLE service_utilisee, service_entreprise, reservation, appartement, utilisateur, entreprise, service, sanction_spec, banissement RESTART IDENTITY;

-- Insertion des données initiales
insert into utilisateur (prenom, nom, mail, mdp, adresse, pays, ville, code_postal, numero, role)
values ('John', 'Doe', 'john.does@example.com',
        '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28',
        '123 Main Street', 'France', 'Paris', 75001, 123456789, 2);

insert into utilisateur (prenom, nom, mail, mdp, adresse, pays, ville, code_postal, numero, role)
values ('admin', 'tech', 'admin@mail.com',
        '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28',
        '123 Main Street', 'France', 'Paris', 75001, 123456789, 4);

insert into appartement (ville, code_postal, prix_fixe_nuit, type_gestion, duree, type_de_bien, logement_entier, nb_chambre, nb_occupant_max, surface, horaire_contact, id_utilisateur)
values ('PARIS', 91560, 12, 'nule', 12, 'une poubelle', 3, 5, 12, 15, 125621, 1);

insert into reservation (total_location, total_abonnement, total_frais, id_appartement, id_utilisateur, date_debut, date_fin)
values (1, 12, 125, 1, 1, '2024-05-23', '2024-05-24');

insert into entreprise (nom, description)
values ('sopra', 'B to B'),
       ('moba', 'jv'),
       ('lambda', 'aleatoire'),
       ('sommeil', 'dans un bon lit');

insert into service (type, description, note, actif)
values ('menage', 'c est tout propre maintenant', 4, true),
       ('repos', 'ça va mieux', 5, true),
       ('menage', 'c est tout propre maintenant', 4, true),
       ('menage', 'c est tout propre maintenant', 4, true),
       ('menage', 'c est tout propre maintenant', 4, true);

insert into service_entreprise (id_service, id_entreprise)
values (1, 1),
       (1, 2),
       (2, 3),
       (2, 4),
       (3, 4);

insert into service_utilisee (date_modif, date_debut, id_reservation, id_utilisateur, id_service_entreprise)
values ('2024-12-20', '2024-12-20', 1, 1, 3),
       ('2024-12-22', '2024-12-28', 1, 1, 2),
       ('2024-12-24', '2024-12-25', 1, 1, 1),
       ('2024-12-22', '2024-12-21', 1, 1, 4);

-- Insertion des spécifications de bannissement
insert into sanction_spec (raison, id_raison, type, restriction, domaine)
values ('message', 1, 'vulgarité', 1, 'role'),
       ('reservation', 2, 'violence', 2, 'rang'),
       ('prestation', 3, 'autre', 3, 'role');

-- Insertion des bannissements
insert into banissement (sujet, description, date_debut, date_fin, id_sanction_spec, id_utilisateur)
values ('Violation des règles', 'Utilisateur a violé les règles de la plateforme', '2024-01-01', '2024-12-31', 1, 1),
       ('Comportement inapproprié', 'Utilisateur a montré un comportement inapproprié', '2024-02-01', '2024-12-31', 2, 2);
