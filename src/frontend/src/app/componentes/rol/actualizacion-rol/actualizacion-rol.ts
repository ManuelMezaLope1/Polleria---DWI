import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRol } from '../IRol';
import { RolServicio } from '../../../servicios/rol/rol-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizacion-rol',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizacion-rol.html',
  styleUrl: './actualizacion-rol.css',
})
export class ActualizacionRol {
  id: number;
  rol: IRol = new IRol();

  constructor(private rolServicio: RolServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.rolServicio.obtenerRolPorId(this.id).pipe(
      tap(dato => {
        this.rol = dato;
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe()
  }

  irALaListaDeRoles() {
    this.router.navigate(['/sistema']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("roles");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
    Swal.fire('Rol actualizado', `El rol ha sido actualizado con éxito`, 'success');
  }

  onSubmit(): void {
    if (this.rol) {
      this.rolServicio.actualizarRol(this.id, this.rol).pipe(
        tap(dato => {
          this.irALaListaDeRoles();
        }),
        catchError(error => {
          console.error("Error al actualizar la categoria: ", error);
          return of(null);
        })
      ).subscribe()
    }
  }
}
