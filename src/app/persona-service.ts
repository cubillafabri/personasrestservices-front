import { Injectable } from "@angular/core";
import { Persona } from "./persona.model";
import { DataService } from "./data-service";

@Injectable()
export class PersonaService {

  personas: Persona[] = [];

  constructor(private dataService: DataService){}


  setPersonas(personas: Persona[]){
    this.personas = personas;
  }
  obtenerPersonas(){
    return this.dataService.cargarPersonas();
  }

  agregarPersona(persona: Persona){
   console.log('Persona a agregar: '+ persona.nombre);
   this.dataService.agregarPersona(persona)
   .subscribe(
      (persona: Persona | any) => {
        console.log('Se agrega al arreglo la persona recien insertada suscriber: ' + persona.idPersona);
        this.personas.push(persona);
      },
   );
  }

  encontrarPersona(id: number){

    const persona: Persona  = this.personas.find(persona => persona.idPersona == id) as Persona;
    console.log('persona encontrada: ' + persona.idPersona + ' '+ persona.nombre);
    return persona;
  }

  modificarPersona(id: number, persona: Persona){
    console.log('Persona a modificar: ' + persona.idPersona);

    const personaModLocal = this.personas.find(persona => persona.idPersona == id);
    personaModLocal!.idPersona = persona.idPersona;
    personaModLocal!.nombre = persona.nombre;

    this.dataService.modificarPersona(id, persona);

  }

  eliminarPersona(id:number){
    console.log('eliminar persona con id: ' + id);
    const index = this.personas.findIndex(persona => persona.idPersona == id);
    this.personas.splice(index, 1);
    this.dataService.eliminarPersona(id);

  }

}
