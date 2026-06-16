import { Component } from '@angular/core';
import { Categoria } from '../Categoria';
import { CategoriaServicio } from '../../../servicios/categoria/categoria-servicio';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-categoria',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-categoria.html',
  styleUrl: './registro-categoria.css',
})
export class RegistroCategoria {
  categoria: Categoria = new Categoria();

  constructor(private categoriaServicio: CategoriaServicio, private router: Router) { }

  ngOnInit(): void {
  }

  guardarCategoria() {
    this.categoriaServicio.registrarCategoria(this.categoria).pipe(
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
      text: `La categoría ${this.categoria.nombre} ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/platos']).then(() => {
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
