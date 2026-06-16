import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alergia } from '../Alergia';
import { AlergiaServicio } from '../../../servicios/alergia/alergia-servicio';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-alergia',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-alergia.html',
  styleUrl: './registro-alergia.css',
})
export class RegistroAlergia {
  alergia: Alergia = new Alergia();

  constructor(private alergiaServicio: AlergiaServicio, private router: Router) { }

  onSubmit(): void {
    this.guardarAlergia();
  }

  guardarAlergia() {
    this.alergiaServicio.registrarAlergia(this.alergia).pipe(
      tap(dato => {
        this.irALaListaDeAlergias();
      }),
      catchError(err => {
        console.error("ERROR COMPLETO:", err);
        console.error("STATUS:", err.status);
        console.error("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeAlergias() {
    Swal.fire({
      title: 'Alergia registrada',
      text: `La alergia ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/ingredientes']).then(() => {
          setTimeout(() => {
            const element = document.getElementById("alergias");
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 200);
        });
      }
    })
  }
}
