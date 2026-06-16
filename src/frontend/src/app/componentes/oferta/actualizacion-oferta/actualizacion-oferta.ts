import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Oferta } from '../Oferta';
import { OfertaServicio } from '../../../servicios/oferta/oferta-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Plato } from '../../plato/Plato';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';

@Component({
  selector: 'app-actualizacion-oferta',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizacion-oferta.html',
  styleUrl: './actualizacion-oferta.css',
})
export class ActualizacionOferta {
  id: number;
  oferta: Oferta = new Oferta;

  constructor(private ofertaServicio: OfertaServicio, private platoServicio: PlatoServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.ofertaServicio.obtenerOfertaPorId(this.id).pipe(
      tap(dato => {
        Object.assign(this.oferta, dato);
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe()

    this.platoServicio.obtenerListaDePlatos().subscribe(dato => {
      this.platosDisponibles = dato;
      this.cd.detectChanges();
    })
  }

  onSubmit(): void {
    if (this.oferta) {
      this.ofertaServicio.actualizarOferta(this.id, this.oferta).pipe(
        tap(dato => {
          this.irALaListaDeOfertas();
        }),
        catchError(error => {
          console.error("Error al actualizar el plato: ", error);
          return of(null);
        })
      ).subscribe()
    }
  }

  irALaListaDeOfertas() {
    this.router.navigate(['/platos']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("platos");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
    Swal.fire('Plato actualizado', `El plato ha sido actualizado éxitosamente`, 'success');
  }

  platosSeleccionados: any[] = [];
  descripcion: string = '';
  cantidad: number = 0;
  platosDisponibles: Plato[] = [];

  actualizarDescripcion() {
    const unicos = [...new Set(this.platosSeleccionados)];

    this.oferta.descripcion = unicos
      .filter(p => p)
      .map(p => p.nombre)
      .join(' + ');
  }

  actualizarPrecio() {
    this.oferta.precio_actual = this.platosSeleccionados
      .filter(p => p != null)
      .reduce((precio_actual, p) => precio_actual + Number(p.precio), 0);
  }

  generarSelects() {
    const cantidad = Number(this.oferta.cantidad) || 0;

    this.platosSeleccionados = Array.from({ length: cantidad }, () => null);

    this.actualizarDescripcion();
  }
}
