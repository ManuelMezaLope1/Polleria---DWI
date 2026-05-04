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
import { ThemeServicio } from '../../../servicios/global/theme-servicio';
import { OfertaServicio } from '../../../servicios/oferta/oferta-servicio';
import { Oferta } from '../../../componentes/oferta/Oferta';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css',
})
export class Prueba {
  data: string[] = [];

  constructor(public themeServicio: ThemeServicio,private axiosService: UsuarioServicio, private categoriaServicio: CategoriaServicio, private platoServicio: PlatoServicio,private usuarioServicio: UsuarioServicio, private ofertaServicio: OfertaServicio,private router: Router) { }

  ngOnInit(): void {
    console.log('ENTRÓ AL COMPONENTE');

    this.categorias$ = this.categoriaServicio.obtenerListaDeCategorias();
    this.platos$ = this.platoServicio.obtenerListaDePlatos();
    this.ofertas$=this.ofertaServicio.obtenerListaDeOfertas();
  }

  volverDashboard(){
    this.router.navigate(['dashboard']);
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

  /*========================================================================================*/
  /*                                      PARA OFERTAS                                      */
  /*========================================================================================*/
  ofertas: Oferta[]=[];
  ofertas$!: Observable<Oferta[]>;

  registrarOferta(){
    this.router.navigate(['creacion-oferta']);
  }

  actualizarOferta(){
    this.router.navigate(['actualizacion-oferta']);
  }

  private obtenerOferta(){
    this.ofertaServicio.obtenerListaDeOfertas().subscribe(dato=>{
      this.ofertas=dato;
    })
  }

  eliminarOferta(id: number) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Confirma si deseas eliminar la oferta",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimínalo',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.ofertaServicio.eliminarOferta(id).subscribe(dato => {
            console.log(dato);
            this.obtenerOferta();
            Swal.fire(
              'Oferta eliminada',
              'La oferta ha sido eliminada con éxito',
              'success'
            )
          })
        }
      });
    }
}
