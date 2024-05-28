delete from service_utilisee;
delete from service_entreprise;
delete from reservation;
delete from appartement;
delete from utilisateur;
delete from entreprise;
delete from service;

insert into utilisateur (prenom, nom, mail, mdp, adresse, pays, ville, code_postal, numero, role)
values('John','Doe','john.does@example.com',
       '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28',
       '123 Main Street','France','Paris',75001,'0123456789', 2);
insert into utilisateur (prenom, nom, mail, mdp, adresse, pays, ville, code_postal, numero, role)
values('admin','tech','admin@mail.com',
       '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28',
       '123 Main Street','France','Paris',75001,'0123456789', 4);

insert into appartement(ville, code_postal, prix_fixe_nuit, type_gestion, duree, type_de_bien, logement_entier, nb_chambre, nb_occupant_max, surface, horaire_contact, id_utilisateur)
values ('PARIS', 91560, 12, 'nule', 12, 'une poubelle', 3, 5, 12, 15, 125621, 1);

insert into reservation(total_location, total_abonnement, total_frais, id_appartement, id_utilisateur, date_debut, date_fin)
values ( 1, 12,125,1,1,'05/23/2024','05/24/2024');

insert into entreprise(nom, description)
values('sopra', 'B to B');
insert into entreprise(nom, description)
values('moba', 'jv');
insert into entreprise(nom, description)
values('lambda', 'aleatoire');
insert into entreprise(nom, description)
values('sommeil', 'dans un bon lit');

insert into service(type, description, tarif, date_debut, date_fin, note, coef, actif)
values('menage', 'c est tout propre maintenant', 10, '12/20/2024', '12/20/2024', 4, 2, true);
insert into service(type, description, tarif, date_debut, date_fin, note, coef, actif)
values('repos', 'ça va mieux', 10, '12/22/2024', '12/25/2024', 5, '1', true);
insert into service(type, description, tarif, date_debut, date_fin, note, coef, actif)
values('menage', 'c est tout propre maintenant', 10, '12/20/2024', '12/20/2024', 4, 2, true);
insert into service(type, description, tarif, date_debut, date_fin, note, coef, actif)
values('menage', 'c est tout propre maintenant', 10, '12/20/2024', '12/20/2024', 4, 2, true);
insert into service(type, description, tarif, date_debut, date_fin, note, coef, actif)
values('menage', 'c est tout propre maintenant', 10, '12/20/2024', '12/20/2024', 4, 2, true);

insert into service_entreprise(id_service, id_entreprise)
values(1, 1);
insert into service_entreprise(id_service, id_entreprise)
values(1, 2);
insert into service_entreprise(id_service, id_entreprise)
values(2, 3);
insert into service_entreprise(id_service, id_entreprise)
values(2, 4);
insert into service_entreprise(id_service, id_entreprise)
values(3, 4);

insert into service_utilisee (date_modif, date_debut, id_reservation, id_utilisateur, id_service_entreprise)
values ('12/20/2024', '12/20/2024', 1, 1, 3);
insert into service_utilisee (date_modif, date_debut, id_reservation, id_utilisateur, id_service_entreprise)
values ('12/22/2024', '12/28/2024', 1, 1, 2);
insert into service_utilisee (date_modif, date_debut, id_reservation, id_utilisateur, id_service_entreprise)
values ('12/24/2024', '12/25/2024', 1, 1, 1);
insert into service_utilisee (date_modif, date_debut, id_reservation, id_utilisateur, id_service_entreprise)
values ('12/22/2024', '12/21/2024', 1, 1, 4);
