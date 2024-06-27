-- Insertion des données initiales
insert into utilisateur (prenom, nom, mail, mdp, adresse, pays, ville, code_postal, numero, role)
values('John','Doe','john.does@example.com',
       '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28',
       '123 Main Street','France','Paris',75001,'0123456789', 2);

insert into utilisateur (prenom, nom, mail, mdp, adresse, pays, ville, code_postal, numero, role)
values('admin','tech','admin@mail.com',
       '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28',
       '123 Main Street','France','Paris',75001,'0123456789', 4);

insert into appartement (ville, code_postal, prix_fixe_nuit, type_gestion, duree, type_de_bien, logement_entier, nb_chambre, nb_occupant_max, surface, horaire_contact, id_utilisateur)
values ('PARIS', 91560, 12, 'nule', 12, 'une poubelle', 3, 5, 12, 15, 125621, 1);

insert into reservation (total_location, total_abonnement, total_frais, id_appartement, id_utilisateur, date_debut, date_fin)
values (1, 12, 125, 1, 1, '2024-05-23', '2024-05-24');

insert into entreprise(nom, description)
values('sopra', 'B to B');
insert into entreprise(nom, description)
values('moba', 'jv');
insert into entreprise(nom, description)
values('lambda', 'aleatoire');
insert into entreprise(nom, description)
values('sommeil', 'dans un bon lit');

insert into service (type, description, note, actif)
values ('menage', 'c est tout propre maintenant', 4, true),
       ('boire', 'dionisos', 5, true),
       ('menage', 'c est tout propre maintenant', 4, true),
       ('coucou', 'couscous', 4, true),
       ('dodo', 'morphé', 4, true);

insert into service_entreprise (id_service, id_entreprise)
values (1, 1),
       (1, 2),
       (2, 3),
       (2, 4),
       (3, 4);

insert into service_utilisee (date_debut,date_fin, id_reservation, id_utilisateur, id_service_entreprise)
values ('2024-12-20', '2024-12-20', 1, 1, 3),
       ('2024-01-22', '2024-12-28', 1, 1, 2),
       ('2024-01-24', '2024-02-25', 1, 1, 1),
       ('2024-02-22', '2024-04-21', 1, 1, 4);

-- Insertion des spécifications de bannissement
insert into sanction_spec (raison, id_raison, type, restriction, domaine)
values ('message', 1, 'vulgarité', 1, 'role'),
       ('reservation', 2, 'violence', 2, 'rang'),
       ('prestation', 3, 'autre', 3, 'role');

-- Insertion des bannissements
insert into banissement (sujet, description, date_debut, date_fin, id_sanction_spec, id_utilisateur)
values ('Violation des règles', 'Utilisateur a violé les règles de la plateforme', '2024-01-01', '2024-12-31', 1, 1),
       ('Comportement inapproprié', 'Utilisateur a montré un comportement inapproprié', '2024-02-01', '2024-12-31', 2, 2);

insert into ticket (sujet, description, date_creation, date_modif, id_traitant, id_reservation, id_utilisateur)
values ('problèmes', 'de sel', '2024-05-05', '2024-05-05', 1, 1, 1)

select
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
inner join public.utilisateur u on u.id = t.id_utilisateur;