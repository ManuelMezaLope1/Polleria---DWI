import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Zona } from '../../componentes/zona/Zona';

@Injectable({
  providedIn: 'root',
})
export class ZonaServicio {
  private baseUrl="http://localhost:8080/api/v1/zonas";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeZonas(): Observable<Zona[]>{
    return this.HttpClient.get<Zona[]>(`${this.baseUrl}`);
  }

  registrarZona(zona: Zona): Observable<Object>{
    return this.HttpClient.post(`${this.baseUrl}`, zona);
  }

  actualizarZona(id: number, zona: Zona): Observable<Object>{
    return this.HttpClient.put(`${this.baseUrl}/${id}`,zona);
  }

  obtenerZonaPorId(id: number): Observable<Zona>{
    return this.HttpClient.get<Zona>(`${this.baseUrl}/${id}`);
  }

  eliminarZona(id:number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseUrl}/${id}`);
  }
}
