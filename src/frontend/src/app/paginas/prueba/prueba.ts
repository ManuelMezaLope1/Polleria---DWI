import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoriaServicio } from '../../servicios/categoria/categoria-servicio';
import { Categoria } from '../../componentes/categoria/Categoria';
import { Plato } from '../../componentes/plato/Plato';
import { PlatoServicio } from '../../servicios/plato/plato-servicio';
import { RolServicio } from '../../servicios/rol/rol-servicio';
import { Rol } from '../../componentes/rol/Rol';
import { UsuarioServicio } from '../../servicios/usuario/usuario-servicio';
import { Usuario } from '../../componentes/usuario/Usuario';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css',
})
export class Prueba {
  constructor(private categoriaServicio: CategoriaServicio, private platoServicio: PlatoServicio, private rolServicio: RolServicio, private usuarioServicio: UsuarioServicio, private router: Router) { }

  ngOnInit(): void {
    console.log('ENTRÓ AL COMPONENTE');
    this.categorias$ = this.categoriaServicio.obtenerListaDeCategorias();
    this.platos$=this.platoServicio.obtenerListaDePlatos();
    this.roles$=this.rolServicio.obtenerListaDeRoles();
    this.usuarios$=this.usuarioServicio.obtenerListaDeUsuarios();
  }

  /*========================================================================================*/
  /*                                   Para Categoría                                       */
  /*========================================================================================*/
  categorias: Categoria[] = [];
  categorias$!: Observable<Categoria[]>;

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
  plato: Plato[]= [];
  platos$!: Observable<Plato[]>;

  actualizarPlato(id:number){
    this.router.navigate(['actualizacion-plato',id]);
  }

  registrarPlato(){
    this.router.navigate(['creacion-plato']);
  }

  private obtenerPlato(){
    this.platoServicio.obtenerListaDePlatos().subscribe(dato=>{
      this.plato=dato;
      console.log(this.plato);
    })
  }

  eliminarPlato(id:number){
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
          this.obtenerCategoria();
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
  /*                                   PARA ROLES                                           */
  /*========================================================================================*/
  roles: Rol[]=[];
  roles$!: Observable<Rol[]>;

  actualizarRol(id:number){
    this.router.navigate(['actualizacion-rol',id]);
  }

  registrarRol(){
    this.router.navigate(['creacion-rol']);
  }

  private obtenerRol(){
    this.rolServicio.obtenerListaDeRoles().subscribe(dato=>{
      this.roles=dato;
      console.log(this.roles);
    })
  }

  eliminarRol(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar el rol",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolServicio.eliminarRol(id).subscribe(dato => {
          console.log(dato);
          this.obtenerRol();
          Swal.fire(
            'Rol eliminado',
            'El rol ha sido eliminado con exito',
            'success'
          )
        })
      }
    });
  }

  /*========================================================================================*/
  /*                                   PARA USUARIOS                                        */
  /*========================================================================================*/
  usuarios: Usuario[]=[];
  usuarios$!: Observable<Usuario[]>;

  actualizarUsuario(id:number){
    this.router.navigate(['actualizacion-usuario',id]);
  }

  private obtenerUsuario(){
    this.usuarioServicio.obtenerListaDeUsuarios().subscribe(dato=>{
      this.usuarios=dato;
      console.log(this.usuarios);
    })
  }

  eliminarUsuario(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar al usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServicio.eliminarUsuario(id).subscribe(dato => {
          console.log(dato);
          this.obtenerUsuario();
          Swal.fire(
            'Usuario eliminado',
            'El usuario ha sido eliminado con exito',
            'success'
          )
        })
      }
    });
  }
}
