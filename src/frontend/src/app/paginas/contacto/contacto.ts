import { Component } from '@angular/core';
import { IMensaje } from '../../componentes/mensaje/IMensaje';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensajeServicio } from '../../servicios/mensaje/mensaje-servicio';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  mensaje: IMensaje=new IMensaje();

  constructor(private mensajeServicio: MensajeServicio, private router: Router){}

  onSubmit(){
    this.mensajeServicio.registrarMensaje(this.mensaje).pipe(
      tap(dato=>{
        this.irAContacto();
      }),
      catchError(err=>{
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }

  irAContacto(){
    this.router.navigate(['inicio']);
    Swal.fire('Mensaje enviado','El mensaje ha sido enviado éxitosamente','success');
  }
}
