delete from service_utilisee;
delete from service_entreprise;
delete from reservation;
delete from appartement;
delete from utilisateur;
delete from entreprise;
delete from service;

insert into utilisateur (id, prenom, nom, mail, mdp, adresse, pays, ville, code_postal, numero, role)
values(1,'John','Doe','john.does@example.com',
       '588a7d81d976810dfb57392769ed7e3a3e1f594e01739458dbb74e3548ba8635',
       '123 Main Street','France','Paris',75001,123456789, 2);
insert into utilisateur (id, prenom, nom, mail, mdp, adresse, pays, ville, code_postal, numero, role)
values(2,'admin','tech','admin@mail.com',
       '588a7d81d976810dfb57392769ed7e3a3e1f594e01739458dbb74e3548ba8635',
       '123 Main Street','France','Paris',75001,123456789, 4);

insert into appartement(id, ville, code_postal, prix_fixe_nuit, type_gestion, duree, type_de_bien, logement_entier, nb_chambre, nb_occupant_max, surface, horaire_contact, id_utilisateur)
values (1,'PARIS', 91560, 12, 'nule', 12, 'une poubelle', 3, 5, 12, 15, 125621, 1);

insert into reservation(id, total_location, total_abonnement, total_frais, id_appartement, id_utilisateur, date_debut, date_fin)
values (1, 1, 12,125,1,1,'05/23/2024','05/24/2024');

insert into entreprise(id, nom, description)
values(1, 'sopra', 'B to B');
insert into entreprise(id, nom, description)
values(2, 'moba', 'jv');
insert into entreprise(id, nom, description)
values(3, 'lambda', 'aleatoire');
insert into entreprise(id, nom, description)
values(4, 'sommeil', 'dans un bon lit');

insert into service(id, type, description, tarif, date_debut, date_fin, note, coef, actif)
values(1, 'menage', 'c est tout propre maintenant', 10, '12/20/2024', '12/20/2024', 4, 2, true);
insert into service(id, type, description, tarif, date_debut, date_fin, note, coef, actif)
values(2, 'repos', 'ça va mieux', 10, '12/22/2024', '12/25/2024', 5, '1', true);
insert into service(id, type, description, tarif, date_debut, date_fin, note, coef, actif)
values(3, 'menage', 'c est tout propre maintenant', 10, '12/20/2024', '12/20/2024', 4, 2, true);
insert into service(id, type, description, tarif, date_debut, date_fin, note, coef, actif)
values(4, 'menage', 'c est tout propre maintenant', 10, '12/20/2024', '12/20/2024', 4, 2, true);
insert into service(id, type, description, tarif, date_debut, date_fin, note, coef, actif)
values(5, 'menage', 'c est tout propre maintenant', 10, '12/20/2024', '12/20/2024', 4, 2, true);

insert into service_entreprise(id, id_service, id_entreprise)
values(1, 1, 1);
insert into service_entreprise(id, id_service, id_entreprise)
values(2, 1, 2);
insert into service_entreprise(id, id_service, id_entreprise)
values(3, 2, 3);
insert into service_entreprise(id, id_service, id_entreprise)
values(4, 2, 4);
insert into service_entreprise(id, id_service, id_entreprise)
values(5, 3, 4);

insert into service_utilisee (id, date_modif, date_debut, id_reservation, id_utilisateur, id_service_entreprise)
values (1, '12/20/2024', '12/20/2024', 1, 1, 3);
insert into service_utilisee (id, date_modif, date_debut, id_reservation, id_utilisateur, id_service_entreprise)
values (2, '12/22/2024', '12/28/2024', 1, 1, 2);
insert into service_utilisee (id, date_modif, date_debut, id_reservation, id_utilisateur, id_service_entreprise)
values (3, '12/24/2024', '12/25/2024', 1, 1, 1);
insert into service_utilisee (id, date_modif, date_debut, id_reservation, id_utilisateur, id_service_entreprise)
values (4, '12/22/2024', '12/21/2024', 1, 1, 4);
