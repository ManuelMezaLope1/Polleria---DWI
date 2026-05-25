import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Alergia } from '../../../componentes/alergia/Alergia';
import { IIngrediente } from '../../../componentes/ingrediente/IIngrediente';
import { IngredienteServicio } from '../../../servicios/ingrediente/ingrediente-servicio';
import { AlergiaServicio } from '../../../servicios/alergia/alergia-servicio';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingrediente',
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './ingrediente.html',
  styleUrl: './ingrediente.css',
})
export class Ingrediente {
  constructor(private ingredienteServicio: IngredienteServicio, private alergiaServicio: AlergiaServicio, private router: Router, private cd: ChangeDetectorRef){}

  ngOnInit(): void{
    this.ingredienteServicio.obtenerTodosLosIngredientes().subscribe(dato => {
      this.dataSourceIngrediente.data = dato;

      this.dataSourceIngrediente.data.forEach(ing => {
        ing.platos = ing.platos?.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
      });

      this.cd.detectChanges();
    });

    this.alergiaServicio.obtenerTodasLasAlergias().subscribe(dato=>{
      this.dataSourceAlergia.data=dato;
    })
  }

  ngAfterViewInit() {
    this.dataSourceIngrediente.paginator = this.paginadorIngrediente;
    this.dataSourceAlergia.paginator=this.paginadorAlergia;
  }

  volverDashboard(){
    this.router.navigate(['dashboard'])
  }

  /*========================================================================================*/
  /*                                 PARA INGREDIENTES                                      */
  /*========================================================================================*/
  ingredientes: IIngrediente[] = [];
  ingredientes$!: Observable<IIngrediente>;

  displayedColumnsIngrediente: string[] = ['nombre', 'platos', 'acciones'];

  dataSourceIngrediente = new MatTableDataSource<IIngrediente>();

  @ViewChild('paginadorIngrediente')
  paginadorIngrediente!: MatPaginator;

  columnasIngrediente: string[] = [
    'nombre',
    'platos',
    'acciones'
  ];

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

  registrarIngrediente() {
    this.router.navigate(['creacion-ingrediente']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("creacion-ingrediente");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  actualizarIngrediente(id: number) {
    this.router.navigate(['actualizacion-ingrediente', id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("actualizacion-ingrediente");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  private obtenerIngredientes() {
    this.ingredienteServicio.obtenerTodosLosIngredientes().subscribe(dato => {
      this.ingredientes = dato;
    })
  }

  eliminarIngrediente(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar el ingrediente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.ingredienteServicio.eliminarIngrediente(id).subscribe(dato => {
          console.log(dato);
          this.ingredienteServicio.obtenerTodosLosIngredientes();
          Swal.fire(
            'Ingrediente eliminado',
            'El ingrediente ha sido eliminado con éxito',
            'success'
          )
        })
      }
    });
  }

  /*========================================================================================*/
  /*                                      PARA ALERGIAS                                     */
  /*========================================================================================*/
  alergias: Alergia[]=[];
  alergia$!: Observable<Alergia[]>;

  displayedColumnsAlergia: string[]=['nombre','ingredientes','acciones'];

  dataSourceAlergia=new MatTableDataSource<Alergia>();

  @ViewChild('paginadorAlergia')
  paginadorAlergia!: MatPaginator;

  columnasAlergia:string[]=[
    'nombre',
    'ingredientes',
    'acciones'
  ];

  registrarAlergia(){
    this.router.navigate(['creacion-alergia']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("creacion-alergia");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  actualizarAlergia(id: number){
    this.router.navigate(['actualizacion-alergia', id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("actualizacion-alergia");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  eliminarAlergia(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la alergía",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.alergiaServicio.eliminarAlergia(id).subscribe(dato => {
          console.log(dato);
          this.alergiaServicio.obtenerTodasLasAlergias();
          Swal.fire(
            'Alergía eliminada',
            'La alergía ha sido eliminada con éxito',
            'success'
          )
        })
      }
    });
  }
}