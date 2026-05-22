import { ChangeDetectorRef, Component } from '@angular/core';
import { Alergia } from '../Alergia';
import { AlergiaServicio } from '../../../servicios/alergia/alergia-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizacion-alergia',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-alergia.html',
  styleUrl: './actualizacion-alergia.css',
})
export class ActualizacionAlergia {
  id: number;
  alergia: Alergia = new Alergia();

  constructor(private cd: ChangeDetectorRef, private alergiaServicio: AlergiaServicio, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.alergiaServicio.obtenerAlergiaPorId(this.id).pipe(
      tap(dato => {
        this.alergia = dato;
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }

  onSubmit(): void {
    if (this.alergia) {
      this.alergiaServicio.actualizarAlergia(this.id, this.alergia).pipe(
        tap(dato => {
          this.irALaListaDeAlergias();
        }),
        catchError(err => {
          console.error("Error al actualizar la alergia: ", err);
          return of(null)
        })
      ).subscribe()
    }
  }

  irALaListaDeAlergias() {
    this.router.navigate(['/pruebas']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("alergias");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    });
    Swal.fire('Alergia actualizada', `La alergia ha sido actualizada con éxito`, 'success');
  }
}
