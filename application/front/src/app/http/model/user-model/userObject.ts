export interface UserObject{
  id ?: bigint,
  prenom: string,
  nom: string,
  mail: string,
  mdp: string,
  adresse: string,
  pays: string,
  ville: string,
  code_postal: number,
  numero: string,
  role: string,
  id_entreprise?:number,
}
