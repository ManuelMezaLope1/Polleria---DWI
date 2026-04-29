import { ChangeDetectorRef, Component } from '@angular/core';
import { MetodoPago } from '../MetodoPago';
import { MetodopagoServicio } from '../../../servicios/metodopago/metodopago-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizacion-metodopago',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-metodopago.html',
  styleUrl: './actualizacion-metodopago.css',
})
export class ActualizacionMetodopago {
  id:number;
  metodopago: MetodoPago=new MetodoPago();

  constructor(private cd: ChangeDetectorRef, private metodoPagoServicio: MetodopagoServicio, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['id'];

    this.metodoPagoServicio.obtenerMetodoPagoPorId(this.id).pipe(
      tap(dato=>{
        this.metodopago=dato;
        this.cd.detectChanges();
      }),
      catchError(error=>{
        return of(null);
      })
    ).subscribe()
  }

  irALaListaDeMetodoPago(){
    this.router.navigate(['/pruebasexternas'])
    Swal.fire('Método de Pago actualizado',`El método de pago ha sido actualziado actualizado con éxito`,'success');
  }

  onSubmit(): void{
    if(this.metodopago){
      this.metodoPagoServicio.actualizarMetodoPago(this.id, this.metodopago).pipe(
        tap(dato=>{
          this.irALaListaDeMetodoPago();
        }),
        catchError(error=>{
          return of(null);
        })
      ).subscribe()
    }
  }
}
