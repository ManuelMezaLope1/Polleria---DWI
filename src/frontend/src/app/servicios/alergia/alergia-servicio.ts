import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alergia } from '../../componentes/alergia/Alergia';

@Injectable({
  providedIn: 'root',
})
export class AlergiaServicio {
  private baseUrl="http://localhost:8080/api/v1/public/alergias";

  constructor(private httpClient: HttpClient){}

  obtenerTodasLasAlergias(): Observable<Alergia[]>{
    return this.httpClient.get<Alergia[]>(`${this.baseUrl}`);
  }

  registrarAlergia(alergia: Alergia): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,alergia);
  }

  obtenerAlergiaPorId(id: number): Observable<Alergia>{
    return this.httpClient.get<Alergia>(`${this.baseUrl}/${id}`);
  }

  actualizarAlergia(id: number, alergia: Alergia): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,alergia);
  }

  eliminarAlergia(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
