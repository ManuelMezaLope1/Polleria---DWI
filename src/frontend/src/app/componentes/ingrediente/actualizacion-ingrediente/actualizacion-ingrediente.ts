import { ChangeDetectorRef, Component } from '@angular/core';
import { IIngrediente } from '../IIngrediente';
import { Plato } from '../../plato/Plato';
import { IngredienteServicio } from '../../../servicios/ingrediente/ingrediente-servicio';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alergia } from '../../alergia/Alergia';
import { AlergiaServicio } from '../../../servicios/alergia/alergia-servicio';

@Component({
  selector: 'app-actualizacion-ingrediente',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizacion-ingrediente.html',
  styleUrl: './actualizacion-ingrediente.css',
})
export class ActualizacionIngrediente {
  id: number;
  ingrediente: IIngrediente=new IIngrediente();
  platos: Plato[]=[];
  platoSeleccionado: any=null;

  alergias: Alergia[]=[];

  constructor(private cd: ChangeDetectorRef, private ingredienteServicio: IngredienteServicio, private platoServicio: PlatoServicio, private alergiaServicio: AlergiaServicio, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['id'];

    this.ingredienteServicio.obtenerIngredientePorId(this.id).pipe(
      tap(dato=>{
        Object.assign(this.ingrediente,dato);
        this.platoSeleccionado =dato.platos[0];
        this.cd.detectChanges();
      }),
      catchError(err=>{
        console.error(err)
        return of(null);
      })
    ).subscribe();

    this.platoServicio.obtenerListaDePlatos().subscribe(dato=>{
      this.platos=dato;
      this.cd.detectChanges();
    });

    this.alergiaServicio.obtenerTodasLasAlergias().subscribe(dato=>{
      this.alergias=dato;
      this.cd.detectChanges();
    })
  }

  compararPlato(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compararAlergia(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSubmit(): void{
    if (this.ingrediente) {
      this.ingrediente.platos = [this.platoSeleccionado];

      this.ingredienteServicio.actualizarIngrediente(this.id, this.ingrediente).pipe(
        tap(dato => {
          console.log(this.ingrediente)
          console.log(this.ingrediente.nombre)
          console.log(this.ingrediente.platos)
          console.log(this.ingrediente.alergia)

          this.irALaListaDeIngredientes();
        }),
        catchError(error => {
          console.error("Error al actualizar el ingrediente: ", error);
          return of(null);
        })
      ).subscribe()
    }
  }

  irALaListaDeIngredientes(){
    this.router.navigate(['/pruebas']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("ingredientes");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
    Swal.fire('Ingrediente actualizado','El ingrediente ha sido actualizado éxitosamente','success');
  }
}
