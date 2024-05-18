import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstancesService {
  static api_url:string = "http://localhost:8081/index.php"

  constructor() { }
}
