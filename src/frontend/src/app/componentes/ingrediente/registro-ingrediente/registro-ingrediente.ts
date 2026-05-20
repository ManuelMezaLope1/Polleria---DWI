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

@Component({
  selector: 'app-registro-ingrediente',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-ingrediente.html',
  styleUrl: './registro-ingrediente.css',
})
export class RegistroIngrediente {
  ingrediente: IIngrediente = new IIngrediente();
  platos: Plato[] = [];

  constructor(private cd: ChangeDetectorRef, private ingredienteServicio: IngredienteServicio, private platoServicio: PlatoServicio, private router: Router) {
    this.ingrediente.platos=[];
  }

  ngOnInit(): void {
    this.platoServicio.obtenerListaDePlatos().subscribe(dato => {
      this.platos = dato;
      this.cd.detectChanges();
    });
  }

  onSubmit() {
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
    Swal.fire('Ingrediente registrado', 'El ingrediente ha sido registrado éxitosamente', 'success')
    this.router.navigate(['/pruebas']);
  }
}
