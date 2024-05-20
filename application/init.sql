create table service
(
    id                  serial
        primary key,
    type                varchar(150),
    description         varchar(255),
    tarif               integer,
    date_debut          timestamp,
    date_fin            timestamp,
    note                integer,
    fiche               text,
    coef                integer,
    url_json_formulaire varchar(255),
    actif               boolean
);

create table entreprise
(
    id          serial
        primary key,
    nom         varchar(200),
    description text,
    logo        varchar(255)
);

create table utilisateur
(
    id                serial
        primary key,
    prenom            varchar(30),
    nom               varchar(100),
    mail              varchar(100)
        unique,
    mdp               varchar(255),
    adresse           varchar(255),
    pays              varchar(50),
    ville             varchar(50),
    code_postal       integer,
    numero            integer,
    date_inscription  timestamp,
    date_modification timestamp,
    role              integer,
    rang              integer,
    token             varchar(255),
    id_entreprise     integer
        references entreprise
);

create table document
(
    id               serial
        primary key,
    url_ci           varchar(255),
    url_habilitation varchar(255),
    tarif            integer,
    id_utilisateur   integer not null
        constraint id_utilisateur
            references utilisateur
);

create table appartement
(
    id              serial
        primary key,
    ville           varchar(50),
    code_postal     integer,
    prix_fixe_nuit  integer,
    type_gestion    varchar(100),
    duree           integer,
    type_de_bien    varchar(100),
    logement_entier integer,
    nb_chambre      integer,
    nb_occupant_max integer,
    surface         integer,
    horaire_contact integer,
    id_utilisateur  integer not null
        references utilisateur
);

create table banissement
(
    id             serial
        primary key,
    sujet          varchar(80),
    description    text,
    date_debut     timestamp,
    date_fin       timestamp,
    specification  varchar(200),
    id_utilisateur integer not null
        references utilisateur
);

create table service_entreprise
(
    id            serial
        primary key,
    id_service    integer not null
        references service,
    id_entreprise integer not null
        references entreprise
);

create table service_appartement
(
    id                    serial
        primary key,
    id_appartement        integer           not null
        references appartement,
    id_service_entreprise integer default 1 not null
        references service_entreprise
);

create table reservation
(
    id               serial
        primary key,
    total_location   integer,
    total_abonnement integer,
    total_frais      integer,
    id_appartement   integer   not null
        references appartement,
    id_utilisateur   integer   not null
        references utilisateur,
    date_debut       timestamp not null,
    date_fin         timestamp not null
);

create table service_utilisee
(
    id                    serial
        primary key,
    date_modif            timestamp,
    date_debut            timestamp,
    id_reservation        integer           not null
        references reservation,
    id_utilisateur        integer           not null
        references utilisateur,
    id_service_entreprise integer default 1 not null
        references service_entreprise
);

create table ticket
(
    id             serial
        primary key,
    sujet          varchar(80),
    description    text,
    date_creation  timestamp,
    date_modif     timestamp,
    id_traitant    integer
        references utilisateur,
    id_reservation integer
        references reservation,
    id_service     integer
        references service_utilisee,
    id_message     integer,
    id_utilisateur integer not null
        references utilisateur
);

create table message
(
    id                  serial
        primary key,
    date_envoie         timestamp,
    texte               text,
    id_service_utilisee integer
        references service_utilisee,
    id_reservation      integer
        references reservation,
    id_ticket           integer
        references ticket,
    id_utilisateur      integer not null
        references utilisateur
);

alter table ticket
    add constraint id_message
        foreign key (id_message) references message;