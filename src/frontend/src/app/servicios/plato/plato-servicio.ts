import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plato } from '../../componentes/plato/Plato';
import { PlatoMesa } from '../../componentes/consulta/PlatoMesa';

@Injectable({
  providedIn: 'root',
})
export class PlatoServicio {
  private baseUrl="http://localhost:8080/api/v1/public/platos";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDePlatos(): Observable<Plato[]>{
    return this.HttpClient.get<Plato[]>(`${this.baseUrl}`);
  }

  registrarPlato(formData: FormData): Observable<Object>{
    return this.HttpClient.post(`${this.baseUrl}`, formData);
  }

  actualizarPlato(id:number, plato: Plato): Observable<Object>{
    return this.HttpClient.put(`${this.baseUrl}/${id}`, plato);
  }

  obtenerPlatoPorId(id:number): Observable<Plato>{
    return this.HttpClient.get<Plato>(`${this.baseUrl}/${id}`);
  }

  eliminarPlato(id:number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseUrl}/${id}`);
  }

  obtenerPlatoMesa(): Observable<PlatoMesa[]>{
    return this.HttpClient.get<PlatoMesa[]>(this.baseUrl+'-mesa');
  }
}
