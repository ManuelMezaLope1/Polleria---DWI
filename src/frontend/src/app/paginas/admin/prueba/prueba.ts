import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoriaServicio } from '../../../servicios/categoria/categoria-servicio';
import { Categoria } from '../../../componentes/categoria/Categoria';
import { Plato } from '../../../componentes/plato/Plato';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css',
})
export class Prueba {
  data: string[] = [];

  constructor(private axiosService: UsuarioServicio, private categoriaServicio: CategoriaServicio, private platoServicio: PlatoServicio,private usuarioServicio: UsuarioServicio, private router: Router) { }

  ngOnInit(): void {
    console.log('ENTRÓ AL COMPONENTE');

    this.categorias$ = this.categoriaServicio.obtenerListaDeCategorias();
    this.platos$ = this.platoServicio.obtenerListaDePlatos();
  }

  /*========================================================================================*/
  /*                                   Para Categoría                                       */
  /*========================================================================================*/
  categorias: Categoria[] = [];
  categorias$!: Observable<Categoria[]>;

  actualizarCategoria(id: number) {
    this.router.navigate(['actualizacion-categoria', id]);
  }

  registrarCategoria() {
    this.router.navigate(['creacion-categoria']);
  }

  private obtenerCategoria() {
    this.categoriaServicio.obtenerListaDeCategorias().subscribe(dato => {
      this.categorias = dato;
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
            'Categoría eliminada',
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
  plato: Plato[] = [];
  platos$!: Observable<Plato[]>;

  actualizarPlato(id: number) {
    this.router.navigate(['actualizacion-plato', id]);
  }

  registrarPlato() {
    this.router.navigate(['creacion-plato']);
  }

  private obtenerPlato() {
    this.platoServicio.obtenerListaDePlatos().subscribe(dato => {
      this.plato = dato;
      console.log(this.plato);
    })
  }

  eliminarPlato(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar el plato",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.platoServicio.eliminarPlato(id).subscribe(dato => {
          console.log(dato);
          this.obtenerPlato();
          Swal.fire(
            'Plato eliminado',
            'El plato ha sido eliminado con exito',
            'success'
          )
        })
      }
    });
  }
}
