import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetodoPago } from '../MetodoPago';
import { MetodopagoServicio } from '../../../servicios/metodopago/metodopago-servicio';
import { Route, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-metodopago',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registro-metodopago.html',
  styleUrl: './registro-metodopago.css',
})
export class RegistroMetodopago {
  metodopago: MetodoPago = new MetodoPago();

  constructor(private metodoPagoServicio: MetodopagoServicio, private router: Router, private fb: FormBuilder) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['']
    })
  }

  guardarMetodoPago() {
    const metodoPagoForm = this.form.value;

    this.metodoPagoServicio.registrarMetodoPago(metodoPagoForm).pipe(
      tap(dato => {
        this.irALaListaDeMetodoPago();
      }),
      catchError(err => {
        console.error("ERROR COMPLETO:", err);
        console.error("STATUS:", err.status);
        console.error("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe();
  }

  irALaListaDeMetodoPago() {
    Swal.fire({
      title: 'Método de pago registrado',
      text: `El método de pago ha sido registrado con éxito`,
      icon: 'success'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/sistema']).then(() => {
          setTimeout(() => {
            const element = document.getElementById("metodopagos");
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        });
      }
    })
  }

  onSubmit() {
    this.guardarMetodoPago();
  }
}
