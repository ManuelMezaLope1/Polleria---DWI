import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RolServicio } from '../../../servicios/rol/rol-servicio';
import { Observable } from 'rxjs';
import { IRol } from '../../../componentes/rol/IRol';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetodoPago } from '../../../componentes/metodopago/MetodoPago';
import { MetodopagoServicio } from '../../../servicios/metodopago/metodopago-servicio';
import { ZonaServicio } from '../../../servicios/zona/zona-servicio';
import { Zona } from '../../../componentes/zona/Zona';

@Component({
  selector: 'app-sistema',
  imports: [CommonModule, FormsModule],
  templateUrl: './sistema.html',
  styleUrl: './sistema.css',
})
export class Sistema {
  roles: IRol[] = [];
  roles$!: Observable<IRol[]>

  constructor(private rolServicio: RolServicio, private metodoPagoServicio: MetodopagoServicio, private zonaServicio: ZonaServicio, private router: Router) { }

  ngOnInit(): void {
    this.roles$ = this.rolServicio.obtenerTodosLosRoles();
    this.metodopagos$ = this.metodoPagoServicio.obtenerListaDeMetodoPago();
    this.zonas$ = this.zonaServicio.obtenerListaDeZonas();
  }

  volverDashboard() {
    this.router.navigate(['dashboard']);
  }

  registrarRol() {
    this.router.navigate(['creacion-rol']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("creacion-rol");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  actualizarRol(id: number) {
    this.router.navigate(['actualizacion-rol', id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("actualizacion-rol");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  eliminarRol(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar el rol",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolServicio.eliminarRol(id).subscribe(dato => {
          console.log(dato);
          this.rolServicio.obtenerTodosLosRoles();
          Swal.fire(
            'Rol eliminado',
            'El rol ha sido eliminado con éxito',
            'success'
          )
        })
      }
    });
  }

  /*========================================================================================*/
  /*                                  Para Método Pago                                      */
  /*========================================================================================*/
  metodopagos: MetodoPago[] = [];
  metodopagos$!: Observable<MetodoPago[]>;

  registrarMetodoPago() {
    this.router.navigate(['creacion-metodopago']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("creacion-metodopago");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  actualizarMetodoPago(id: number) {
    this.router.navigate(['actualizacion-metodopago', id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("actualizacion-metodopago");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  private obtenerMetodoPago() {
    this.metodoPagoServicio.obtenerListaDeMetodoPago().subscribe(data => {
      this.metodopagos = data;
    })
  }

  eliminarMetodoPago(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la zona",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.metodoPagoServicio.eliminarMetodoPago(id).subscribe(dato => {
          this.obtenerMetodoPago();
          Swal.fire(
            'Método pago eliminado',
            'El método de pago ha sido eliminado con éxito',
            'success'
          )
        })
      }
    })
  }

  /*========================================================================================*/
  /*                                   Para Zonas                                           */
  /*========================================================================================*/
  zonas: Zona[] = [];
  zonas$!: Observable<Zona[]>;

  registrarZona() {
    this.router.navigate(['creacion-zona']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("creacion-zona");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    });
  }

  actualizarZona(id: number){
    this.router.navigate(['actualizacion-zona',id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("actualizacion-zona");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    });
  }

  private obtenerZona() {
    this.zonaServicio.obtenerListaDeZonas().subscribe(dato => {
      this.zonas = dato;
    })
  }

  eliminarZona(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la zona",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.zonaServicio.eliminarZona(id).subscribe(dato => {
          console.log(dato);
          this.obtenerZona();
          Swal.fire(
            'Zona eliminada',
            'La zona ha sido eliminada con éxito',
            'success'
          )
        })
      }
    });
  }
}
