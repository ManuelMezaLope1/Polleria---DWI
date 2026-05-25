import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoriaServicio } from '../../../servicios/categoria/categoria-servicio';
import { Categoria } from '../../../componentes/categoria/Categoria';
import { Plato } from '../../../componentes/plato/Plato';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { ThemeServicio } from '../../../servicios/global/theme-servicio';
import { OfertaServicio } from '../../../servicios/oferta/oferta-servicio';
import { Oferta } from '../../../componentes/oferta/Oferta';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IIngrediente } from '../../../componentes/ingrediente/IIngrediente';
import { IngredienteServicio } from '../../../servicios/ingrediente/ingrediente-servicio';
import { AlergiaServicio } from '../../../servicios/alergia/alergia-servicio';
import { Alergia } from '../../../componentes/alergia/Alergia';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css',
})
export class Prueba {
  data: string[] = [];

  constructor(public themeServicio: ThemeServicio, private cd: ChangeDetectorRef, private categoriaServicio: CategoriaServicio, private platoServicio: PlatoServicio, private usuarioServicio: UsuarioServicio, private ofertaServicio: OfertaServicio, private ingredienteServicio: IngredienteServicio, private alergiaServicio: AlergiaServicio, private router: Router) { }

  ngOnInit(): void {
    console.log('ENTRÓ AL COMPONENTE');

    this.categorias$ = this.categoriaServicio.obtenerListaDeCategorias().pipe(
      map(categorias =>
        categorias.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        )
      )
    );

    this.categoriaServicio.obtenerListaDeCategorias().subscribe(dato => {
      this.dataSourceCategoria.data = dato;

      this.dataSourceCategoria.data = this.dataSourceCategoria.data.sort((a, b) =>
        a.nombre.localeCompare(b.nombre),
      );

      this.dataSourceCategoria.data.forEach(cat => {
        cat.plato = cat.plato?.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
      });

      this.cd.detectChanges();
    });

    this.platoServicio.obtenerListaDePlatos().subscribe(dato => {
      this.dataSourcePlato.data = dato;

      this.cd.detectChanges();
    });

    this.ofertas$ = this.ofertaServicio.obtenerListaDeOfertas();
  }

  ngAfterViewInit() {
    this.dataSourceCategoria.paginator = this.paginadorCate;
    this.dataSourcePlato.paginator = this.paginadorPlato;
  }

  volverDashboard() {
    this.router.navigate(['dashboard']);
  }

  /*========================================================================================*/
  /*                                   Para Categoría                                       */
  /*========================================================================================*/
  categorias: Categoria[] = [];
  categorias$!: Observable<Categoria[]>;

  displayedColumnsCate: string[] = ['nombre', 'plato', 'acciones'];

  dataSourceCategoria = new MatTableDataSource<Categoria>();

  @ViewChild('paginadorCate')
  paginadorCate!: MatPaginator;

  columnasCate: string[] = [
    'nombre',
    'plato',
    'acciones'
  ];

  actualizarCategoria(id: number) {
    this.router.navigate(['actualizacion-categoria', id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("actualizacion-categoria");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  registrarCategoria() {
    this.router.navigate(['creacion-categoria']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("creacion-categoria");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
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
            'La categoría ha sido eliminada con éxito',
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
    this.router.navigate(['actualizacion-plato', id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("actualizacion-plato");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  registrarPlato() {
    this.router.navigate(['creacion-plato']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("creacion-plato");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
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

  displayedColumns: string[] = ['id', 'nombre', 'precio'];

  dataSourcePlato = new MatTableDataSource<Plato>();

  @ViewChild('paginadorPlato')
  paginadorPlato!: MatPaginator;

  columnas: string[] = [
    'nombre',
    'categoria',
    'descripcion',
    'precio',
    'acciones'
  ];

  /*========================================================================================*/
  /*                                      PARA OFERTAS                                      */
  /*========================================================================================*/
  ofertas: Oferta[] = [];
  ofertas$!: Observable<Oferta[]>;

  registrarOferta() {
    this.router.navigate(['creacion-oferta']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("creacion-oferta");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  actualizarOferta(id: number) {
    this.router.navigate(['actualizacion-oferta',id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("actualizacion-oferta");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  private obtenerOferta() {
    this.ofertaServicio.obtenerListaDeOfertas().subscribe(dato => {
      this.ofertas = dato;
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
