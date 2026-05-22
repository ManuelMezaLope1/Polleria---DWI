import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IIngrediente } from '../IIngrediente';
import { Plato } from '../../plato/Plato';
import { IngredienteServicio } from '../../../servicios/ingrediente/ingrediente-servicio';
import { Router } from '@angular/router';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import Swal from 'sweetalert2';
import { catchError, tap, throwError } from 'rxjs';
import { Alergia } from '../../alergia/Alergia';
import { AlergiaServicio } from '../../../servicios/alergia/alergia-servicio';

@Component({
  selector: 'app-registro-ingrediente',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-ingrediente.html',
  styleUrl: './registro-ingrediente.css',
})
export class RegistroIngrediente {
  ingrediente: IIngrediente = new IIngrediente();
  platos: Plato[] = [];
  platoSeleccionado: any = null;
  alergias: Alergia[]=[];

  constructor(private cd: ChangeDetectorRef, private ingredienteServicio: IngredienteServicio, private platoServicio: PlatoServicio, private alergiaServicio: AlergiaServicio, private router: Router) {
    this.ingrediente.alergia=null;
  }

  ngOnInit(): void {
    this.platoServicio.obtenerListaDePlatos().subscribe(dato => {
      this.platos = dato;
      this.cd.detectChanges();
    });

    this.alergiaServicio.obtenerTodasLasAlergias().subscribe(dato=>{
      this.alergias=dato;
      this.cd.detectChanges();
    })
  }

  onSubmit() {
    this.ingrediente.platos = [this.platoSeleccionado];

    this.ingredienteServicio.registrarIngrediente(this.ingrediente).pipe(
      tap(dato => {
        this.irALaListaDeIngredientes();
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeIngredientes() {
    this.router.navigate(['/pruebas']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("ingredientes");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
    Swal.fire('Ingrediente registrado', 'El ingrediente ha sido registrado éxitosamente', 'success')
  }
}
