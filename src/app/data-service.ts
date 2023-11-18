import { Injectable } from "@angular/core";
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Persona } from "./persona.model";

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) {}

  urlBase = 'http://localhost:8080/personas-backend-restservices/webservice/personas';


  cargarPersonas(){
    return this.httpClient.get(this.urlBase);
  }

  agregarPersona(persona: Persona){
    return this.httpClient.post(this.urlBase, persona);
  }

  modificarPersona(idPersona: number, persona: Persona){
    let url: string;
    url = this.urlBase + '/' + idPersona;
    this.httpClient.put(url, persona)
    .subscribe(
      (response)=>console.log('Resultado modificar persona: ' + response),
      (error) => console.log('error en modificar persona:' + error)
    );
    /*this.httpClient.put(url, persona)
     .subscribe({ // se recupera el objeto de forma directa como respuesta. procesar la respuesta...
      next: response => console.log('Resultado modificar persona: ' + response),
      error: err => console.error('Error en modificar persona: ' + err),
      complete: () => console.info('Completado modificar persona')
    });*/
  }

  eliminarPersona(idPersona: number){
    let url: string;
    url = this.urlBase + '/' + idPersona;
    this.httpClient.delete(url)
    .subscribe({
     next: response => console.log('Resultado eliminar persona: ' + response),
     error: err => console.error('Error en eliminar persona: ' + err),
     complete: () => console.info('Completado eliminar persona')
   });
  }

}
