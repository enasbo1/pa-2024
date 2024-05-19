alter table entreprise drop column id_utilisateur;
alter table service_appartement drop column id_service;
alter table service_utilisee drop column id_service;

insert into service(type)  values ('lambda n°32546');
insert into entreprise(nom) values ('lambda n°32546');

insert into service_entreprise(id_service, id_entreprise)
values (
           (select min(id) from service where type = 'lambda n°32546'),
           (select min(id) from entreprise where nom = 'lambda n°32546')
       );

alter table service_appartement add column id_SERVICE_ENTREPRISE INT
    NOT NULL default 1;
alter table service_appartement add FOREIGN KEY(id_SERVICE_ENTREPRISE) REFERENCES service_entreprise(id);

alter table service_utilisee add column id_SERVICE_ENTREPRISE INT
    NOT NULL default 1;
alter table service_utilisee add FOREIGN KEY(id_SERVICE_ENTREPRISE) REFERENCES service_entreprise(id);

alter table utilisateur  add column id_ENTREPRISE INT;
alter table utilisateur add FOREIGN KEY(id_ENTREPRISE) REFERENCES entreprise(id);

alter table entreprise add column logo varchar(255);
alter table service add column actif boolean default true;

update service set actif=true where actif is null;