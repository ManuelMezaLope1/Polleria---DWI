import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../../componentes/oferta/Oferta';
import { OfertaMesa } from '../../componentes/consulta/OfertaMesa';

@Injectable({
  providedIn: 'root',
})
export class OfertaServicio {
  private baseUrl="http://localhost:8080/api/v1/public/ofertas";
  private baseUrlOfertaPlatos="http://localhost:8080/api/v1/public/oferta-platos";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeOfertas(): Observable<Oferta[]>{
    return this.HttpClient.get<Oferta[]>(`${this.baseUrl}`);
  }

  registrarOferta(oferta: Oferta): Observable<Object>{
    return this.HttpClient.post(`${this.baseUrl}`,oferta);
  }

  guardarLote(relaciones: any[]){
    return this.HttpClient.post(this.baseUrlOfertaPlatos+'/lote',relaciones);
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

  obtenerOfertaMesa(): Observable<OfertaMesa[]>{
    return this.HttpClient.get<OfertaMesa[]>(this.baseUrl+'-mesa');
  }
}
