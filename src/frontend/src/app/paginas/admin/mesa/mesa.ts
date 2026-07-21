import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMesa } from '../../../componentes/pedido/IMesa';
import Swal from 'sweetalert2';
import { MesaServicio } from '../../../servicios/mesa/mesa-servicio';
import { catchError, of, tap, throwError } from 'rxjs';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-mesa',
  imports: [CommonModule, FormsModule],
  templateUrl: './mesa.html',
  styleUrl: './mesa.css',
})
export class Mesa {
  id: number;
  idActualizar: number;
  mesaSeleccionada: string = '';
  mesa1: any;
  active: string = 'salaUno';
  abriendo = false;
  mesaUbicacion: any;
  mesaParaActualizar: any;

  mesa: IMesa = new IMesa();
  mesaActualizar: IMesa = new IMesa();
  capacidadSeleccionada: any = null;

  mesaCuatro: any[] = [];
  cantidadMesas = Array(6).fill(0);

  mesaSeis: any[] = [];
  cantidadMesasSeis = Array(4).fill(0);

  mesaOcho: any[] = [];
  cantidadMesasOcho = Array(6).fill(0);

  mesaDiez: any[] = [];
  cantidadMesasDiez = Array(4).fill(0);

  constructor(private mesaServicio: MesaServicio, private cd: ChangeDetectorRef) {
    this.mesaUbicacion = null;
  }

  ngOnInit(): void {
    this.mesa.estado = "Libre";

    this.cargarMesasCuatro();
    this.cargarMesasSeis();
    this.cargarMesasOcho();
    this.cargarMesasDiez();
  }

  onPuertaTab(): void {
    this.active = "puerta";
  }

  abrirPuertas() {
    this.abriendo = true;

    setTimeout(() => {
      this.active = 'salaUno';
    }, 800);
  }

  entrarSalaUno() {
    this.active = "salaUno";
  }

  entrarSalaDos() {
    this.active = "salaDos";
  }

  entrarSalaTres() {
    this.active = "salaTres";
  }

  cargarMesasCuatro() {
    this.mesaServicio.obtenerMesaCuatro().subscribe(datos => {
      this.mesaCuatro = datos;
      this.cd.detectChanges();
    })
  }

  cargarMesasSeis() {
    this.mesaServicio.obtenerMesaSeis().subscribe(datos => {
      this.mesaSeis = datos;
      this.cd.detectChanges();
    })
  }

  cargarMesasOcho() {
    this.mesaServicio.obtenerMesaOcho().subscribe(datos => {
      this.mesaOcho = datos;
      this.cd.detectChanges();
    })
  }

  cargarMesasDiez() {
    this.mesaServicio.obtenerMesaDiez().subscribe(datos => {
      this.mesaDiez = datos;
      this.cd.detectChanges();
    })
  }

  onSubmit() {
    this.mesa.capacidad = this.capacidadSeleccionada;
    this.mesa.ubicacion = this.mesaUbicacion;

    if (this.mesa.nombre === undefined) {
      Swal.fire('Oops...', 'Falta el nombre', 'warning');
      return;
    } else if (this.mesa.nombre.startsWith(' ')) {
      Swal.fire('Oops...', 'El nombre no debe empezar con espacio', 'warning');
      return;
    }

    if (this.mesa.capacidad === undefined || this.mesa.capacidad === null) {
      Swal.fire('Oops...', 'Falta la capacidad', 'warning');
      return;
    } else if (this.capacidadSeleccionada === 4) {
      if (this.mesaCuatro.length === 6) {
        Swal.fire('Oops...', 'Ya no caben más mesas con capacidad 4', 'warning');
        return;
      }
      return;
    } else if (this.capacidadSeleccionada === 6) {
      if (this.mesaSeis.length === 4) {
        Swal.fire('Oops...', 'Ya no caben más mesas con capacidad 6', 'warning');
        return;
      }
      return;
    } else if (this.capacidadSeleccionada === 8) {
      if (this.mesaOcho.length === 6) {
        Swal.fire('Oops...', 'Ya no caben más mesas con capacidad 8', 'warning');
        return;
      }
      return;
    } else if (this.capacidadSeleccionada === 10) {
      if (this.mesaDiez.length === 4) {
        Swal.fire('Oops...', 'Ya no caben más mesas con capacidad 10', 'warning');
        return;
      }
      return;
    }

    if (this.mesa.ubicacion === undefined || this.mesa.ubicacion === null) {
      Swal.fire('Oops...', 'Falta la ubicacion', 'warning');
      return;
    }

    this.mesaServicio.registrarMesas(this.mesa).pipe(
      tap(dato => {
        console.log(this.mesa)
        this.irALaListaDeMesas();
      }),
      catchError(err => {
        console.error("ERROR COMPLETO:", err);
        console.error("STATUS:", err.status);
        console.error("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeMesas() {
    Swal.fire({
      title: 'Mesa registrada',
      text: `La mesa ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    }))
  }

  obtenerMesaPorId(id: number) {
    this.id = id;

    this.mesaServicio.obtenerMesaPorId(id).subscribe({
      next: (datos) => {
        this.mesaParaActualizar = datos;

        this.cd.detectChanges();

        const modal = new bootstrap.Modal(
          document.getElementById('mesaActualizarModal')!
        );

        modal.show();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmitActualizar() {
    this.cd.detectChanges();
    this.idActualizar = this.mesaParaActualizar.id;
    this.mesaActualizar.nombre = this.mesaParaActualizar.nombre;
    this.mesaActualizar.estado = "Pendiente";
    this.mesaActualizar.capacidad = this.mesaParaActualizar.capacidad;
    this.mesaActualizar.ubicacion = this.mesaParaActualizar.ubicacion;

    this.mesaServicio.actualizarMesa(this.idActualizar, this.mesaActualizar).pipe(
      tap(dato => {
        this.actualizarPagina();
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe()
  }

  actualizarPagina() {
    Swal.fire({
      title: 'Mesa actualizada',
      text: `La mesa ha sido actualizada con éxito`,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
}
