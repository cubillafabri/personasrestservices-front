import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../persona.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: []
})
export class FormularioComponent implements OnInit{

  nombreInput: string | unknown | null;
  idPersona!: number;

  constructor(private personaService: PersonaService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.idPersona = this.route.snapshot.params['idPersona'];
    console.log('params: ' + this.route.snapshot.params['idPersona']);
    if(this.idPersona != null){
        const persona = this.personaService.encontrarPersona(this.idPersona);
        if(persona != null){
          this.nombreInput = persona.nombre;
        }
    }
  }

  onGuardarPersona(){
    const personaAGuardar = new Persona(this.idPersona, this.nombreInput);
    if(this.idPersona != null){
        this.personaService.modificarPersona(this.idPersona, personaAGuardar);
    }else{
      this.personaService.agregarPersona(personaAGuardar);
    }
    this.router.navigate(['personas']);
  }

  onEliminarPersona(){
    if(this.idPersona != null){
      console.log('persona a eliminar: ' + this.idPersona);
      this.personaService.eliminarPersona(this.idPersona);
    }
    this.router.navigate(['personas']);
  }

}
