import { ChangeDetectorRef, Component } from '@angular/core';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ZonaServicio } from '../../../servicios/zona/zona-servicio';
import { Zona } from '../../../componentes/zona/Zona';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VentaServicio } from '../../../servicios/venta/venta-servicio';
import { Venta } from '../../../componentes/venta/Venta';

@Component({
  selector: 'app-cuenta',
  imports: [CommonModule, FormsModule],
  templateUrl: './cuenta.html',
  styleUrl: './cuenta.css',
})
export class Cuenta {
  usuario: any;
  username: string;
  zonas: Zona[] = [];
  ventas: Venta[] = [];

  constructor(private usuarioServicio: UsuarioServicio, private zonaServicio: ZonaServicio, private ventaServicio: VentaServicio, private cd: ChangeDetectorRef, private router: Router) { }

  /*#################################################################################################################################################
  ##                                                                    PARA CUENTA                                                                 #
  #################################################################################################################################################*/
  active: string = "informacion";

  onInformacionTab(): void {
    this.active = "informacion";
  }

  onHistorialTab(): void {
    this.active = "historial";
  }

  ngOnInit(): void {
    this.zonaServicio.obtenerListaDeZonas().subscribe(dato => { 
      this.zonas = dato,
      this.cd.detectChanges();
    })

    this.usuarioServicio.obtenerPerfil().pipe(
      tap(data => {
        this.usuario = data;
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe();

    this.ventaServicio.obtenerVentas().subscribe(data => {
      this.ventas = data;
      this.ventas.sort((a, b) => {
        const diff = new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        return diff !== 0 ? diff : b.id - a.id;
      });
    });
  }

  parseFecha(fecha: string): Date {
    const [datePart, timePart] = fecha.split(', ');

    const [day, month, year] = datePart.split('/');

    return new Date(`${year}-${month}-${day}T${timePart}`);
  }

  compararZonas(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  irALaCuenta() {
    this.router.navigate(['/cuenta']);
    Swal.fire('Usuario actualizado', 'El usuario se actualizó correctamente', 'success');
  }

  onSubmit(): void {
    if (this.usuario) {
      this.usuarioServicio.actualizarUsuario(this.usuario).pipe(
        tap(dato => {
          this.irALaCuenta();
        }),
        catchError(error => {
          console.error("Error al actualizar el usuario: ", error);
          return of(null);
        })
      ).subscribe()
    }
  }
}
