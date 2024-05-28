import {EventEmitter, Injectable} from '@angular/core';
import {UserObject} from "../http/model/user-model/userObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";
import {RegexBase} from "../shared/RegexBase";
import {UserModelService} from "../http/model/user-model/user-model.service";

@Injectable({
  providedIn: 'root'
})
export class UserMapperService {
  static rolesList = [
    'voyageur',
    'bailleur',
    'prestataire',
    'admin'
  ]
  static roles : Record<string,string> = {
    '1': UserMapperService.rolesList[0],
    '2': UserMapperService.rolesList[1],
    '3': UserMapperService.rolesList[2],
    '4': UserMapperService.rolesList[3]
  }

  static get_U_Name(user?: { prenom?:string, nom?:string }):string{
    let i:string|undefined = user?.prenom;
    i = i?i[0].toUpperCase():'';
    return i+". " +user?.nom
  }

  static model_to_list(user?:UserObject, detailPage?:string):ListObject{
    return {
      title:UserMapperService.get_U_Name(user),
      link:(detailPage?detailPage+"/":'')+user?.id,
      right:[
        {text : "Mail : "+ user?.mail},
        {text : "Nom : "+ user?.nom },
        {text : "Prenom : "+ user?.prenom }
      ],
      mid:[
        {text : "Adresse : "+ user?.adresse},
        {text : "Ville : "+ user?.ville},
        {text : "Pays : "+ user?.pays}

      ],
      propriete:[
        {name : 'Role' , value: user?.role?UserMapperService.roles[Number(user.role)]:undefined},
        {name : 'Pays' , value: user?.pays},
        {name : 'mail' , value: user?.mail},
        {name : 'nom' , value: user?.nom},
        {name : 'prenom' , value: user?.prenom},

        /*

        besoin de rentrer tous les attributs de userObject?

        */
        {name : 'number', value: user?.id},
      ]
    }
  }

  static model_to_rubric(user?:UserObject, title?:string):RubricObject{
    return {
      title: (title?title:'') + UserMapperService.get_U_Name(user),
      content :[
        {name : 'id', type:'text', text:user?.id?.toString()},
        {name : 'prenom', type:'text', text:user?.prenom},
        {name : 'nom', type:'text', text:user?.nom},
        {name : 'mail', type:'text', text:user?.mail},
        {name : 'adresse', type:'text', text:user?.adresse},
        {name : 'pays', type:'text', text:user?.pays},
        {name : 'ville', type:'text', text:user?.ville},
        {name : 'code_postal', type:'text', text:user?.code_postal?.toString()},
        {name : 'numero', type:'text', text:user?.numero?.toString()},
        {name : 'role', type:'text', text:UserMapperService.roles[user?.role?user.role:'1']},
        {name : 'entreprise', type:'link', text:user?.id_entreprise?.toString(),
          value:'entreprise/'+user?.id_entreprise},
      ]
    }
  }

  static model_to_form(user?:UserObject, title?:string):FormStepObject[]{
    return [
      {
        title:title,
        errorEvent:new EventEmitter<string>(),
        validator:(step:FormStepObject):EventEmitter<boolean>|boolean=>{
         const n = FormService.require_values(step.content[0].content, ["prenom", "nom"])
          if (n){
            step.errorEvent?.emit("le champ "+n+" doit être remplis");
            return false;
          }
          step.errorEvent?.emit("");
          return true;
        },
        content :[
          {
            title : 'identite',
            content:[
              {
                name:"prenom",
                title:"prenom *",
                type : "text",
                placeholder:"Timéo",
                default:user?.prenom,
              },
              {
                name:"nom",
                title:"nom *",
                type : "text",
                placeholder:"Dupond",
                default:user?.nom,
              },
              {
                name:"mail",
                title:"Email *",
                type : "email",
                placeholder:"timeo.dupond@mail.com",
                default:user?.mail,
              },
            ]
          },
        ]
      },
      {
        errorEvent:new EventEmitter<string>(),
        content:[
          {
            title:"Adresse",
            content:[
              {
                name:"adresse",
                title:"Adresse *",
                type : "text",
                placeholder:"2 allée de la nuit blance",
                default:user?.adresse,
                reg_error:[
                  {regex:RegexBase.required, message: "l'adresse doit être renseignée"}
                ]
              },
              {
                name:"code_postal",
                title:"Code Postal *",
                type : "text",
                placeholder:"01015",
                reg_error:[
                  {regex:RegexBase.code_postal, message: "le code postal doit faire 5 chiffres"}
                ],
                default:user?.code_postal,
              },
              {
                name:"ville",
                title: "Ville *",
                type: "text",
                placeholder: "Utopia",
                reg_error:[
                  {regex:RegexBase.norm, message: "un nom de ville ne contient pas le caractères spéciaux"},
                  {regex:RegexBase.nonum, message: "un nom de ville ne contient pas de chiffres"}
                ],
                default: user?.ville
              },
              {
                name:"pays",
                title:"Pays *",
                type : "text",
                placeholder:"FRANCE",
                default:user?.pays,
                reg_error:[
                  {regex:RegexBase.norm, message: "un nom de ville ne contient pas le caractères spéciaux"},
                  {regex:RegexBase.nonum, message: "un nom de ville ne contient pas de chiffres"}
                ],
              }
            ]
          },
        ]
      },
      {
        errorEvent:new EventEmitter<string>(),
        validator:(step:FormStepObject):EventEmitter<boolean>|boolean=>{
          const n = FormService.require_values(step.content[2].content, ["role"])
          if (n){
            step.errorEvent?.emit("le champ "+n+" doit être rempli");
            return false;
          }
          step.errorEvent?.emit("");
          return true;
        },
        content:[
          {
            title:"Coordonnées",
            content:[
              {
                name:"numero",
                title:"telephone",
                type: "text",
                default: user?.numero,
                placeholder: "0786791542",
                reg_error:[
                  {regex: RegexBase.tel, message:'le numéro doit être un numéro de telephone valide'}
                ]
              }
            ]
          },
          {
            title:"Mot de passe",
            content:[
              {
                name:"mdp",
                type:"password",
                placeholder: "******"
              },
            ]
          },
          {
            title:"Role",
            content:[
              {
                name:"role",
                type:"dropdown",
                default: UserMapperService.roles[user?.role?user.role:'1'],
                choices: UserMapperService.rolesList
              },
            ]
          }
        ]
      }
    ]
  }

  static form_to_model(values:FormFieldObject[]):UserObject{
    const mdp = FormService.get_value(values, "mdp")
    return {
      prenom: (FormService.get_value(values, "prenom") as string).toUpperCase(),
      nom: (FormService.get_value(values, "nom") as string).toUpperCase(),
      mail: (FormService.get_value(values, "mail") as string).toLowerCase(),
      mdp: mdp?mdp as string:undefined,
      adresse: FormService.get_value(values, 'adresse') as string,
      pays: (FormService.get_value(values, "pays") as string).toUpperCase(),
      ville: (FormService.get_value(values, "ville") as string).toUpperCase(),
      code_postal: FormService.get_value(values, "code_postal") as string,
      numero: FormService.get_value(values, "numero") as string,
      role: (UserMapperService.rolesList.indexOf(FormService.get_value(values, "role") as string)+1).toString().toLowerCase(),
    }
  }

}
