import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plato } from '../Plato';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Categoria } from '../../categoria/Categoria';
import { CategoriaServicio } from '../../../servicios/categoria/categoria-servicio';

@Component({
  selector: 'app-actualizacion-plato',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-plato.html',
  styleUrl: './actualizacion-plato.css',
})
export class ActualizacionPlato {
  id: number;
  plato: Plato = new Plato();
  categorias: Categoria[] = [];

  constructor(private cd: ChangeDetectorRef, private platoServicio: PlatoServicio, private categoriaServicio: CategoriaServicio, private router: Router, private route: ActivatedRoute) { };

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.platoServicio.obtenerPlatoPorId(this.id).pipe(
      tap(dato => {
        Object.assign(this.plato, dato);
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.log(error);
        return of(null);
      })
    ).subscribe()

    this.categoriaServicio.obtenerListaDeCategorias().subscribe(dato => {
      this.categorias = dato;
    });


  }

  compararCategorias(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  irALaListaDePlatos() {
    this.router.navigate(['/pruebas']);
    Swal.fire('Plato actualizado', `El plato ${this.plato.nombre} ha sido actualizado éxitosamente`, 'success');
  }

  onSubmit(): void {
    if (this.plato) {
      this.platoServicio.actualizarPlato(this.id, this.plato).pipe(
        tap(dato => {
          this.irALaListaDePlatos();
        }),
        catchError(error => {
          console.error("Error al actualizar el plato: ", error);
          return of(null);
        })
      ).subscribe()
    }
  }
}
