import { ChangeDetectorRef, Component } from '@angular/core';
import { CategoriaIngrediente } from '../CategoriaIngrediente';
import { CategoriaIngredienteServicio } from '../../../servicios/categoriaingrediente/categoria-ingrediente-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizacion-categoria-ingrediente',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-categoria-ingrediente.html',
  styleUrl: './actualizacion-categoria-ingrediente.css',
})
export class ActualizacionCategoriaIngrediente {
  id: number;
  categoria: CategoriaIngrediente = new CategoriaIngrediente();

  constructor(private cd: ChangeDetectorRef, private categoriaIngredienteServicio: CategoriaIngredienteServicio, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.categoriaIngredienteServicio.obtenerCategoriaPorId(this.id).pipe(
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

  onSubmit(): void{
    if(this.categoria){
      this.categoriaIngredienteServicio.actualizarCategoria(this.id, this.categoria).pipe(
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

  irALaListaDeCategorias() {
      this.router.navigate(['/ingredientes']).then(() => {
        setTimeout(() => {
          const element = document.getElementById("categoria-ingredientes");
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
      Swal.fire('Categoria actualizada', `La categoria ha sido actualizada con éxito`, 'success');
    }
}
