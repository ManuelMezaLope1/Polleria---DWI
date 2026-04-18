import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoriaServicio } from '../../servicios/categoria/categoria-servicio';
import { Categoria } from '../categoria/Categoria';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css',
})
export class Prueba {
  /*========================================================================================*/
  /*                                   Para Categoría                                       */
  /*========================================================================================*/
  categorias: Categoria[] = [];
  categorias$!: Observable<Categoria[]>;

  constructor(private categoriaServicio: CategoriaServicio, private router: Router) { }

  ngOnInit(): void {
    console.log('ENTRÓ AL COMPONENTE');
    this.categorias$ = this.categoriaServicio.obtenerListaDeCategorias();
  }

  actualizarCategoria(id: number) {
    this.router.navigate(['actualizacion-categoria', id]);
  }

  registrarCategoria(){
    this.router.navigate(['creacion-categoria']);
  }

  private obtenerCategoria(){
    this.categoriaServicio.obtenerListaDeCategorias().subscribe(dato=>{
      this.categorias=dato;
      console.log(this.categorias);
      
    })
  }

  eliminarCategoria(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la categoria",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaServicio.eliminarCategoria(id).subscribe(dato => {
          console.log(dato);
          this.obtenerCategoria();
          Swal.fire(
            'Categoría eliminado',
            'La categoría ha sido eliminada con exito',
            'success'
          )
        })
      }
    });
  }

  /*========================================================================================*/
  /*                                      PARA PLATOS                                       */
  /*========================================================================================*/

}
