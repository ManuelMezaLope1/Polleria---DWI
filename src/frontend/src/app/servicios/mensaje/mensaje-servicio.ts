import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMensaje } from '../../componentes/mensaje/IMensaje';

@Injectable({
  providedIn: 'root',
})
export class MensajeServicio {
  private baseUrl="http://localhost:8080/api/v1/public/mensajes";

  constructor(private httpClient: HttpClient){}

  obtenerTodosLosMensaje(): Observable<IMensaje[]>{
    return this.httpClient.get<IMensaje[]>(`${this.baseUrl}`);
  }

  registrarMensaje(mensaje: IMensaje): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,mensaje);
  }
}
