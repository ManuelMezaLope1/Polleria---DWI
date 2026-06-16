import { ChangeDetectorRef, Component } from '@angular/core';
import { Usuario } from '../Usuario';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Zona } from '../../zona/Zona';
import { ZonaServicio } from '../../../servicios/zona/zona-servicio';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RolServicio } from '../../../servicios/rol/rol-servicio';
import { IRol } from '../../rol/IRol';

@Component({
  selector: 'app-actualizacion-usuario',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-usuario.html',
  styleUrl: './actualizacion-usuario.css',
})
export class ActualizacionUsuario {
  id: number;
  usuario: Usuario = new Usuario();
  zonas: Zona[] = [];
  roles: IRol[] = [];
  rolSeleccionado: any;

  constructor(private cd: ChangeDetectorRef, private usuarioServicio: UsuarioServicio, private zonaServicio: ZonaServicio, private rolServicio: RolServicio, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.zonaServicio.obtenerListaDeZonas().subscribe(dato => {
      this.zonas = dato;
      this.cd.detectChanges();
    });

    this.rolServicio.obtenerTodosLosRoles().subscribe(dato => {
      this.roles = dato;
      this.cd.detectChanges();
    })

    this.id = this.route.snapshot.params['id'];

    this.usuarioServicio.obtenerUsuarioPorId(this.id).pipe(
      tap(dato => {
        Object.assign(this.usuario, dato);
        this.rolSeleccionado = this.usuario.roles[0];
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }

  compararZonas(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compararRoles(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSubmit() {
    if (this.usuario) {
      this.usuario.roles = [this.rolSeleccionado];

      this.usuarioServicio.actualizarUsuarios(this.id, this.usuario).pipe(
        tap(dato => {
          this.irAUsuarios();

        }),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      ).subscribe()
    }
  }

  irAUsuarios() {
    Swal.fire({
      title: 'Usuario registrado',
      text: `El usuario ha sido registrado con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/usuarios']);
      }
    })
  }
}
