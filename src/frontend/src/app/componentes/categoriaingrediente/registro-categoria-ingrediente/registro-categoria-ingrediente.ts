import { Component } from '@angular/core';
import { CategoriaIngrediente } from '../CategoriaIngrediente';
import { CategoriaIngredienteServicio } from '../../../servicios/categoriaingrediente/categoria-ingrediente-servicio';
import Swal from 'sweetalert2';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-categoria-ingrediente',
  imports: [FormsModule],
  templateUrl: './registro-categoria-ingrediente.html',
  styleUrl: './registro-categoria-ingrediente.css',
})
export class RegistroCategoriaIngrediente {
categoria: CategoriaIngrediente = new CategoriaIngrediente();

  constructor(private categoriaIngredienteServicio: CategoriaIngredienteServicio, private router: Router) { }

  ngOnInit(): void {
  }

  guardarCategoria() {
    this.categoriaIngredienteServicio.registrarCategoria(this.categoria).pipe(
      tap(dato => {
        this.irALaListaDeCategorias();
      }),
      catchError(err => {
        console.error("ERROR COMPLETO:", err);
        console.error("STATUS:", err.status);
        console.error("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe();
  }

  irALaListaDeCategorias() {
    Swal.fire({
      title: 'Categoria registrada',
      text: `La categoría ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/ingredientes']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("categorias");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
      }
    })
  }

  onSubmit() {
    this.guardarCategoria();
  }
}
