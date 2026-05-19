import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Oferta } from '../Oferta';
import { OfertaServicio } from '../../../servicios/oferta/oferta-servicio';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { Plato } from '../../plato/Plato';

@Component({
  selector: 'app-registro-oferta',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-oferta.html',
  styleUrl: './registro-oferta.css',
})
export class RegistroOferta {
  oferta: Oferta = new Oferta();
  platosDisponibles: Plato[] = [];

  constructor(private ofertaServicio: OfertaServicio, private platoServicio: PlatoServicio, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.platoServicio.obtenerListaDePlatos().subscribe(dato => {
      this.platosDisponibles = dato;
      this.cd.detectChanges();
    })
  }

  guardarOferta() {
    this.ofertaServicio.registrarOferta(this.oferta).pipe(
      tap(dato => {
        this.irALaListaDeOfertas();
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }

  irALaListaDeOfertas() {
    Swal.fire({
      title: 'Oferta registrada',
      text: 'La oferta ha sido registrada con éxito',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/pruebas'])
      }
    })
  }

  onSubmit() {
    this.guardarOferta();
  }

  platosSeleccionados: any[] = [];
  descripcion: string = '';
  cantidad: number = 0;

  actualizarDescripcion() {
    const unicos = [...new Set(this.platosSeleccionados)];

    this.oferta.descripcion = unicos
      .filter(p => p)
      .map(p => p.nombre)
      .join(' + ');
  }

  actualizarPrecio() {
    console.log(this.platosSeleccionados.map(p => p?.precio));
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
