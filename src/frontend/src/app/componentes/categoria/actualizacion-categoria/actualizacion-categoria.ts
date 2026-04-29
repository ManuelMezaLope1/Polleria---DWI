import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../Categoria';
import { CategoriaServicio } from '../../../servicios/categoria/categoria-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizacion-categoria',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-categoria.html',
  styleUrl: './actualizacion-categoria.css',
})

export class ActualizacionCategoria {
  id: number;
  categoria: Categoria = new Categoria();

  constructor(private cd: ChangeDetectorRef, private categoriaServicio: CategoriaServicio, private router: Router, private route: ActivatedRoute) { };

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.categoriaServicio.obtenerCategoriaPorId(this.id).pipe(
      tap(dato => {
        this.categoria = dato;
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe()
  }

  irALaListaDeCategorias() {
    this.router.navigate(['/pruebas']);
    Swal.fire('Categoria actualizada', `La categoria ${this.categoria.nombre} ha sido actualizada con éxito`, 'success');
  }

  onSubmit(): void {
    if (this.categoria) {
      this.categoriaServicio.actualizarCategoria(this.id, this.categoria).pipe(
        tap(dato => {
          this.irALaListaDeCategorias();
        }),
        catchError(error => {
          console.error("Error al actualizar la categoria: ", error);
          return of(null);
        })
      ).subscribe()
    }
  }
}