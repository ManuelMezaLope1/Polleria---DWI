import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plato } from '../../componentes/plato/Plato';

@Injectable({
  providedIn: 'root',
})
export class PlatoServicio {
  private baseUrl="http://localhost:8080/api/v1/platos";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDePlatos(): Observable<Plato[]>{
    return this.HttpClient.get<Plato[]>(`${this.baseUrl}`);
  }

  registrarPlato(plato: Plato): Observable<Object>{
    return this.HttpClient.post(`${this.baseUrl}`, plato);
  }

  actualizarPlato(id:number, plato: Plato): Observable<Object>{
    return this.HttpClient.put(`${this.baseUrl}/${id}`, plato);
  }

  obtenerPlatoPorId(id:number, plato:Plato): Observable<Object>{
    return this.HttpClient.get<Plato>(`${this.baseUrl}/${id}`);
  }

  eliminarPlato(id:number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseUrl}/${id}`);
  }
}
