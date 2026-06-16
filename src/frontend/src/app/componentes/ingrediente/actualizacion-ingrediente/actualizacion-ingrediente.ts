import { ChangeDetectorRef, Component } from '@angular/core';
import { IIngrediente } from '../IIngrediente';
import { Plato } from '../../plato/Plato';
import { IngredienteServicio } from '../../../servicios/ingrediente/ingrediente-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alergia } from '../../alergia/Alergia';
import { AlergiaServicio } from '../../../servicios/alergia/alergia-servicio';
import { CategoriaIngrediente } from '../../categoriaingrediente/CategoriaIngrediente';
import { CategoriaIngredienteServicio } from '../../../servicios/categoriaingrediente/categoria-ingrediente-servicio';
import { EstadoIngrediente } from '../EstadoIngrediente';

@Component({
  selector: 'app-actualizacion-ingrediente',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizacion-ingrediente.html',
  styleUrl: './actualizacion-ingrediente.css',
})
export class ActualizacionIngrediente {
  id: number;
  ingrediente: IIngrediente=new IIngrediente();

  alergias: Alergia[]=[];
  categorias: CategoriaIngrediente[]=[];
  estados: EstadoIngrediente[]=[];

  constructor(private cd: ChangeDetectorRef, private ingredienteServicio: IngredienteServicio, private alergiaServicio: AlergiaServicio, private categoriaIngredienteServicio: CategoriaIngredienteServicio, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['id'];

    this.ingredienteServicio.obtenerIngredientePorId(this.id).pipe(
      tap(dato=>{
        Object.assign(this.ingrediente,dato);
        this.cd.detectChanges();
      }),
      catchError(err=>{
        console.error(err)
        return of(null);
      })
    ).subscribe();

    this.alergiaServicio.obtenerTodasLasAlergias().subscribe(dato=>{
      this.alergias=dato;
      this.cd.detectChanges();
    });

    this.categoriaIngredienteServicio.obtenerTodasLasCategorias().subscribe(dato=>{
      this.categorias=dato;
      this.cd.detectChanges();
    })

    this.ingredienteServicio.obtenerTodosLosEstados().subscribe(dato=>{
      this.estados=dato;
      this.cd.detectChanges;
    })
  }

  compararAlergia(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compararCategoria(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compararEstado(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSubmit(): void{
    if (this.ingrediente) {
      this.ingredienteServicio.actualizarIngrediente(this.id, this.ingrediente).pipe(
        tap(dato => {
          this.irALaListaDeIngredientes();
        }),
        catchError(error => {
          console.error("Error al actualizar el ingrediente: ", error);
          return of(null);
        })
      ).subscribe()
    }
  }

  irALaListaDeIngredientes(){
    this.router.navigate(['/ingredientes']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("ingredientes");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
    Swal.fire('Ingrediente actualizado','El ingrediente ha sido actualizado éxitosamente','success');
  }
}
