import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../persona-service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  //styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit{
  personas: Persona[] = [];
  idPersona!: number;

  constructor(private personaService: PersonaService, private router: Router, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.personaService.obtenerPersonas()
      .subscribe(
        (personasObtenidas: Persona[] | any) =>{
          this.personas = personasObtenidas;
          this.personaService.setPersonas(this.personas);
          console.log('personas obtenidas del subscriber: '+ this.personas);
        }
      );
  }

  irAgregar(){
    console.log('nos vamos a agregar');
    this.router.navigate(['./personas/agregar']);
  }

  onEliminarPersona(idPersona: number){
    if(idPersona != null){
      console.log('persona a eliminar: ' + idPersona);
      this.personaService.eliminarPersona(idPersona);
    }
    this.router.navigate(['personas']);
  }


}
