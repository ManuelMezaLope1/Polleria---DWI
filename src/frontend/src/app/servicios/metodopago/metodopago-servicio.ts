import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoPago } from '../../componentes/metodopago/MetodoPago';


@Injectable({
  providedIn: 'root',
})
export class MetodopagoServicio {
  private baseUrl="http://localhost:8080/api/v1/metodopago";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeMetodoPago(): Observable<MetodoPago[]>{
    return this.HttpClient.get<MetodoPago[]>(`${this.baseUrl}`);
  }

  registrarMetodoPago(metodoPago: MetodoPago): Observable<Object>{
    return this.HttpClient.post(`${this.baseUrl}`, metodoPago);
  }

  actualizarMetodoPago(id:number, metodoPago: MetodoPago): Observable<Object>{
    return this.HttpClient.put(`${this.baseUrl}/${id}`, metodoPago);
  }

  obtenerMetodoPagoPorId(id:number): Observable<MetodoPago>{
    return this.HttpClient.get<MetodoPago>(`${this.baseUrl}/${id}`);
  }

  eliminarMetodoPago(id:number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseUrl}/${id}`);
  }
}
