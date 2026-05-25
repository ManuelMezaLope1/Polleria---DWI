import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZonaServicio } from '../../../servicios/zona/zona-servicio';
import { Router } from '@angular/router';
import { Zona } from '../../../componentes/zona/Zona';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../../../componentes/usuario/Usuario';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';

import { MetodopagoServicio } from '../../../servicios/metodopago/metodopago-servicio';
import { MetodoPago } from '../../../componentes/metodopago/MetodoPago';

@Component({
  selector: 'app-pruebasexternas',
  imports: [CommonModule],
  templateUrl: './pruebasexternas.html',
  styleUrl: './pruebasexternas.css',
})
export class Pruebasexternas {
  constructor(private zonaServicio: ZonaServicio, private usuarioServicio: UsuarioServicio, private router: Router) { }

  ngOnInit(): void {
    this.usuarios$=this.usuarioServicio.obtenerListaDePlatos();
  }

  volverDashboard(){
    this.router.navigate(['dashboard']);
  }

  /*========================================================================================*/
  /*                                   Para Usuarios                                        */
  /*========================================================================================*/
  usuarios$!: Observable<Usuario[]>;
}
