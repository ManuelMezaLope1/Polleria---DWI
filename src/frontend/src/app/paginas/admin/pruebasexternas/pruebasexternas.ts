import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZonaServicio } from '../../../servicios/zona/zona-servicio';
import { Router } from '@angular/router';
import { Zona } from '../../../componentes/zona/Zona';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../../../componentes/usuario/Usuario';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';

@Component({
  selector: 'app-pruebasexternas',
  imports: [CommonModule],
  templateUrl: './pruebasexternas.html',
  styleUrl: './pruebasexternas.css',
})
export class Pruebasexternas {
  constructor(private zonaServicio: ZonaServicio, private usuarioServicio: UsuarioServicio, private router: Router) { }

  ngOnInit(): void {
    this.zonas$ = this.zonaServicio.obtenerListaDeZonas();
    this.usuarios$=this.usuarioServicio.obtenerListaDePlatos();
  }

  /*========================================================================================*/
  /*                                   Para Zonas                                           */
  /*========================================================================================*/
  zonas: Zona[] = [];
  zonas$!: Observable<Zona[]>;

  registrarZona() {
    this.router.navigate(['creacion-zona']);
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
            'La zona ha sido eliminada con exito',
            'success'
          )
        })
      }
    });
  }

  /*========================================================================================*/
  /*                                   Para Usuarios                                        */
  /*========================================================================================*/
  usuarios$!: Observable<Usuario[]>;
}
