import {EventEmitter, Injectable} from '@angular/core';
import {UserObject} from "../http/model/user-model/userObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";

@Injectable({
  providedIn: 'root'
})
export class UserMapperService {
  static roles : string[] =[
    'bannit',
    'voyageur',
    'bailleur',
    'prestataire',
    'admin'
  ]

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
        {name : 'Role' , value: user?.role},
        {name : 'Pays' , value: user?.pays},
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
        {name : 'role', type:'text', text:user?.role},
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
         const n = FormService.require_values(step.content[0].content, ["prenom", "nom", "mail"])
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
                type : "text",
                placeholder:"timeo.dupond@mail.com",
                default:user?.mail,
              },
            ]
          },
        ]
      },
      {
        validator:(step:FormStepObject):EventEmitter<boolean>|boolean=>{
          const n = FormService.require_values(step.content[0].content, ["adresse", "code_postal", "ville", "pays"])
          if (n){
            step.errorEvent?.emit("le champ "+n+" doit être remplis");
            return false;
          }
          step.errorEvent?.emit("");
          return true;
        },
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
              },
              {
                name:"code_postal",
                title:"Code Postal *",
                type : "num",
                placeholder:"01015",
                default:user?.code_postal,
              },
              {
                name:"ville",
                title: "Ville *",
                type: "text",
                placeholder: "Utopia",
                default: user?.ville
              },
              {
                name:"pays",
                title:"Pays *",
                type : "text",
                placeholder:"FRANCE",
                default:user?.pays,
              }
            ]
          },
        ]
      },
      {
        validator:(step:FormStepObject):EventEmitter<boolean>|boolean=>{
          const m = FormService.get_value(step.content[0].content, "numero")
          if (m){
            step.errorEvent?.emit("le champ numéro doit être rempli");
            return false;
          }
          if (m?.toString()?.length){

          }
          let n = FormService.require_values(step.content[1].content, ["mdp"])
          if (n){
            step.errorEvent?.emit("le champ "+n+" doit être rempli");
            return false;
          }
          n = FormService.require_values(step.content[2].content, ["role"])
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
                type: "num",
                placeholder: "0786791542",
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
                choices:UserMapperService.roles
              },
            ]
          }
        ]
      }
    ]
  }

  static form_to_model(values:FormFieldObject[]):UserObject{
    return {
      prenom: FormService.get_value(values, "prenom") as string,
      nom: FormService.get_value(values, "nom") as string,
      mail: FormService.get_value(values, "mail") as string,
      mdp: FormService.get_value(values, "mdp") as string,
      adresse: FormService.get_value(values, 'adresse') as string,
      pays: FormService.get_value(values, "pays") as string,
      ville: FormService.get_value(values, "ville") as string,
      code_postal: FormService.get_value(values, "code_postal") as number,
      numero: FormService.get_value(values, "numero") as number,
      role: UserMapperService.roles.indexOf(FormService.get_value(values, "role") as string).toString(),
    }
  }

}
