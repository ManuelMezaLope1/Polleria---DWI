import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../../componentes/oferta/Oferta';

@Injectable({
  providedIn: 'root',
})
export class OfertaServicio {
  private baseUrl="http://localhost:8080/api/v1/public/ofertas";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeOfertas(): Observable<Oferta[]>{
    return this.HttpClient.get<Oferta[]>(`${this.baseUrl}`);
  }

  registrarOferta(oferta: Oferta): Observable<Object>{
    return this.HttpClient.post(`${this.baseUrl}`,oferta);
  }

  actualizarOferta(id:number,oferta:Oferta): Observable<Object>{
    return this.HttpClient.put(`${this.baseUrl}/${id}`,oferta);
  }

  obtenerOfertaPorId(id:number): Observable<Oferta>{
    return this.HttpClient.get<Oferta>(`${this.baseUrl}/${id}`);
  }

  eliminarOferta(id:number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseUrl}/${id}`);
  }
}
