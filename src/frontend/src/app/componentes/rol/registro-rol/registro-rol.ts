import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRol } from '../IRol';
import { RolServicio } from '../../../servicios/rol/rol-servicio';
import { Router } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-rol',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-rol.html',
  styleUrl: './registro-rol.css',
})
export class RegistroRol {
  rol: IRol = new IRol();

  constructor(private rolservicio: RolServicio, private router: Router) { }

  onSubmit(): void {
    this.guardarRol();
  }

  guardarRol() {
    this.rolservicio.registrarRol(this.rol).pipe(
      tap(dato => {
        this.irALaListaDeRoles();
      }),
      catchError(err => {
        console.error("ERROR COMPLETO:", err);
        console.error("STATUS:", err.status);
        console.error("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe();
  }

  irALaListaDeRoles() {
    Swal.fire({
      title: 'Rol registrado',
      text: `El rol ha sido registrado con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/sistema']).then(() => {
          setTimeout(() => {
            const element = document.getElementById("roles");
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        });
      }
    })
  }
}
