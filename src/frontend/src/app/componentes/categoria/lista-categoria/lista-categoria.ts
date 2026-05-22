import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Categoria } from '../Categoria';
import { CategoriaServicio } from '../../../servicios/categoria/categoria-servicio';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map, Observable } from 'rxjs';
import { IngredienteServicio } from '../../../servicios/ingrediente/ingrediente-servicio';
import { IIngrediente } from '../../ingrediente/IIngrediente';
import { Alergia } from '../../alergia/Alergia';
import { AlergiaServicio } from '../../../servicios/alergia/alergia-servicio';

@Component({
  selector: 'app-lista-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-categoria.html',
  styleUrl: './lista-categoria.css',
})

export class ListaCategoria implements OnInit {
  categorias: Categoria[] = [];
  categorias$!: Observable<Categoria[]>;

  ingredientes: IIngrediente[] = [];
  ingredientes$!: Observable<IIngrediente[]>;

  alergias: Alergia[] = [];
  alergias$!: Observable<Alergia[]>;

  constructor(private categoriaServicio: CategoriaServicio, private ingredienteServicio: IngredienteServicio, private alergiaServicio: AlergiaServicio, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ENTRÓ AL COMPONENTE');

    this.categorias$ = this.categoriaServicio.obtenerListaDeCategorias().pipe(
      map(categorias =>
        categorias.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        )
      )
    );

    this.ingredienteServicio.obtenerTodosLosIngredientes().subscribe(dato => {
      this.ingredientes = dato;
      this.cd.detectChanges();
    });
    this.alergiaServicio.obtenerTodasLasAlergias().subscribe(dato => {
      this.alergias = dato;
      this.cd.detectChanges();
    })
  }

  nombreAlergia: string;

  alergiaSeleccionada(nombre: string) {
    this.nombreAlergia = nombre;
  }

  agruparIngredientes(ingredientes: any[]) {
    return ingredientes.reduce((acc: any[], ingrediente: any) => {

      const existe = acc.find(
        item => item.nombre === ingrediente.nombre
      );

      if (existe) {
        existe.platos.push(...ingrediente.platos);
      } else {
        acc.push({
          nombre: ingrediente.nombre,
          platos: [...ingrediente.platos]
        });
      }

      return acc;
    }, []);
  }

  actualizarCategoria(id: number) {
    this.router.navigate(['actualizacion-categoria', id]);
  }

  realizarCompra(id: number) {
    this.router.navigate(['carro/plato', id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("compras");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
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
