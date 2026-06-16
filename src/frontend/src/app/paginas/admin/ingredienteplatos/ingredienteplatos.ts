import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IngredienteServicio } from '../../../servicios/ingrediente/ingrediente-servicio';
import { IIngrediente } from '../../../componentes/ingrediente/IIngrediente';
import { map, Observable } from 'rxjs';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { Plato } from '../../../componentes/plato/Plato';
import Swal from 'sweetalert2';
import { IngredientePlatosServicio } from '../../../servicios/ingredienteplatos/ingrediente-platos-servicio';

@Component({
  selector: 'app-ingredienteplatos',
  imports: [CommonModule, FormsModule],
  templateUrl: './ingredienteplatos.html',
  styleUrl: './ingredienteplatos.css',
})
export class Ingredienteplatos {
  ingredienteSeleccionado: any = null;
  platoSeleccionado: any = null;

  ingredientes: IIngrediente[] = [];
  ingredientes$!: Observable<IIngrediente[]>;

  platos: Plato[] = [];
  platos$!: Observable<Plato[]>;

  platoAgregado: any = null;
  ingredienteAgregado: any[] = [];

  constructor(private ingredienteServicio: IngredienteServicio, private platoServicio: PlatoServicio, private ingredientePlatoServicio: IngredientePlatosServicio, private router: Router) { }

  volverDashboard() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.ingredientes$ = this.ingredienteServicio.obtenerTodosLosIngredientes().pipe(
      map(ingredientes =>
        ingredientes.sort((a, b) => a.nombre.localeCompare(b.nombre))
      )
    );

    this.platos$ = this.platoServicio.obtenerListaDePlatos().pipe(
      map(platos =>
        platos.sort((a, b) => a.nombre.localeCompare(b.nombre))
      )
    );
  }

  agregarPlato() {
    if (!this.platoSeleccionado) return;

    this.platoAgregado = {
      id: this.platoSeleccionado.id,
      nombre: this.platoSeleccionado.nombre,
      precio: this.platoSeleccionado.precio,
      descripcion: this.platoSeleccionado.descripcion,
      imagen: this.platoSeleccionado.imagen,
      categoria: this.platoSeleccionado.categoria
    }
  }

  agregarIngrediente() {
    if (!this.platoAgregado) {
      Swal.fire('Oops...', 'Primero seleccione un plato', 'warning');
      return;
    }

    if (!this.ingredienteSeleccionado) return;

    const ingredienteExistente = this.ingredienteAgregado.find(
      p => p.id === this.ingredienteSeleccionado.id
    )

    if (ingredienteExistente) {
      Swal.fire('Oops...', 'Ya se agregó el ingrediente', 'warning')
    } else {
      this.ingredienteAgregado.push({
        id: this.ingredienteSeleccionado.id,
        nombre: this.ingredienteSeleccionado.nombre,
        categoriaIngrediente: this.ingredienteSeleccionado.categoriaIngrediente,
        estadoIngrediente: this.ingredienteSeleccionado.estadoIngrediente,
        alergia: this.ingredienteSeleccionado.alergia,
        imagen: this.ingredienteSeleccionado.imagen
      })
    }
  }

  quitarIngrediente(index: number) {
    this.ingredienteAgregado.splice(index, 1);
  }

  guardarRelaciones() {
    if (!this.platoAgregado) {
      Swal.fire(
        'Oops...',
        'Seleccione un plato',
        'warning'
      );

      return;
    }

    if (this.ingredienteAgregado.length === 0) {
      Swal.fire(
        'Oops...',
        'Debe agregar al menos un ingrediente',
        'warning'
      );

      return;
    }

    const relaciones = this.ingredienteAgregado.map(ingrediente => ({
      platoId: this.platoAgregado.id,
      ingredienteId: ingrediente.id
    }));

    console.log(relaciones);

    this.ingredientePlatoServicio.guardarLote(relaciones).subscribe({
      next: (resp: any) => {
        if (resp.insertados > 0 && resp.duplicados.length === 0) {
          Swal.fire(
            'Felicidades',
            `Se registraron ${resp.insertados} relaciones correctamente.`,
            'success'
          );

          return;
        }

        if (resp.insertados === 0 && resp.duplicados.length > 0) {
          let mensaje = 'Todas las relaciones ya estaban registradas:\n\n';

          resp.duplicados.forEach((d: string) => {
            mensaje += `${d}\n`;
          });

          Swal.fire(
            'Advertencia',
            mensaje, 
            'warning'
          );

          return;
        }

        if (resp.insertados > 0 && resp.duplicados > 0) {
          let mensaje =
            `Se registraron ${resp.insertados} relaciones.\n\n` +
            'Las siguientes ya existían:\n\n';

          resp.duplicados.forEach((d: string) => {
            mensaje += `• ${d}\n`;
          });

          Swal.fire(
            'Proceso completado',
            mensaje,
            'info'
          );
        }
      },
      error: () => {
        Swal.fire(
          'Error',
          'No se pudieron guardar las relaciones',
          'error'
        );
      }
    })
  }
}
