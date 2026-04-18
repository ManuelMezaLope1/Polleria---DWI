import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../Categoria';
import { CategoriaServicio } from '../../../servicios/categoria/categoria-servicio';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-categoria.html',
  styleUrl: './lista-categoria.css',
})

export class ListaCategoria implements OnInit{
  categorias: Categoria[]=[];
  categorias$!: Observable<Categoria[]>;

  constructor(private categoriaServicio: CategoriaServicio, private router:Router){}

  ngOnInit(): void{
    console.log('ENTRÓ AL COMPONENTE');
    this.categorias$=this.categoriaServicio.obtenerListaDeCategorias();
  }

  actualizarCategoria(id:number){
    this.router.navigate(['actualizacion-categoria', id]);
  }

  /*private obtenerCategoria(){
    this.categoriaServicio.obtenerListaDeCategorias().subscribe(dato=>{
      this.categorias=dato;
      console.log(this.categorias);
      
    })
  }*/

  eliminarCategoria(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la categoria",
      icon: 'warning', // Cambiado 'type' a 'icon'
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
          this.categoriaServicio.obtenerListaDeCategorias()
          Swal.fire(
            'Empleado eliminado',
            'El empleado ha sido eliminado con exito',
            'success'
          )
        })
      }
    });
  }
}
