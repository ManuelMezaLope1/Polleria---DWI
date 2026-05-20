import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MensajeServicio } from '../../../servicios/mensaje/mensaje-servicio';
import { IMensaje } from '../../../componentes/mensaje/IMensaje';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mensaje',
  imports: [CommonModule],
  templateUrl: './mensaje.html',
  styleUrl: './mensaje.css',
})
export class Mensaje {
  mensajes: IMensaje[]=[];
  mensajes$!: Observable<IMensaje[]>;

  constructor(private mensajeServicio: MensajeServicio){}

  ngOnInit(): void{
    this.mensajes$=this.mensajeServicio.obtenerTodosLosMensaje();
  }
}
