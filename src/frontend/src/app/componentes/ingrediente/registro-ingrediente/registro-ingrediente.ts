import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IIngrediente } from '../IIngrediente';
import { IngredienteServicio } from '../../../servicios/ingrediente/ingrediente-servicio';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, tap, throwError } from 'rxjs';
import { Alergia } from '../../alergia/Alergia';
import { AlergiaServicio } from '../../../servicios/alergia/alergia-servicio';
import { CategoriaIngrediente } from '../../categoriaingrediente/CategoriaIngrediente';
import { EstadoIngrediente } from '../EstadoIngrediente';
import { CategoriaIngredienteServicio } from '../../../servicios/categoriaingrediente/categoria-ingrediente-servicio';

@Component({
  selector: 'app-registro-ingrediente',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-ingrediente.html',
  styleUrl: './registro-ingrediente.css',
})
export class RegistroIngrediente {
  ingrediente: IIngrediente = new IIngrediente();
  alergias: Alergia[]=[];
  categorias: CategoriaIngrediente[]=[];
  estados: EstadoIngrediente[]=[];

  constructor(private cd: ChangeDetectorRef, private ingredienteServicio: IngredienteServicio, private alergiaServicio: AlergiaServicio, private categoriaIngredienteServicio: CategoriaIngredienteServicio, private router: Router) {
    this.ingrediente.alergia=null;
    this.ingrediente.categoriaIngrediente = null;
  }

  ngOnInit(): void {
    this.alergiaServicio.obtenerTodasLasAlergias().subscribe(dato=>{
      this.alergias=dato;
      this.cd.detectChanges();
    })

    this.categoriaIngredienteServicio.obtenerTodasLasCategorias().subscribe(dato=>{
      this.categorias=dato;
      this.cd.detectChanges();
    })

    this.ingredienteServicio.obtenerTodosLosEstados().subscribe(dato=>{
      this.estados=dato;
      this.ingrediente.estadoIngrediente = this.estados.find(e => e.id === 1);
      this.cd.detectChanges;
    })
  }

  onSubmit() {
    this.ingredienteServicio.registrarIngrediente(this.ingrediente).pipe(
      tap(dato => {
        this.irALaListaDeIngredientes();
      }),
      catchError(err => {
        console.error("ERROR COMPLETO:", err);
        console.error("STATUS:", err.status);
        console.error("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeIngredientes() {
    this.router.navigate(['/ingredientes']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("ingredientes");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
    Swal.fire('Ingrediente registrado', 'El ingrediente ha sido registrado éxitosamente', 'success')
  }
}
