import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIngrediente } from '../../componentes/ingrediente/IIngrediente';
import { EstadoIngrediente } from '../../componentes/ingrediente/EstadoIngrediente';

@Injectable({
  providedIn: 'root',
})
export class IngredienteServicio {
  private baseUrl="http://localhost:8080/api/v1/public/ingredientes";
  private baseUrlEstado="http://localhost:8080/api/v1/public/estado-ingrediente"

  constructor(private httpClient: HttpClient){}

  obtenerTodosLosIngredientes(): Observable<IIngrediente[]>{
    return this.httpClient.get<IIngrediente[]>(`${this.baseUrl}`);
  }

  obtenerTodosLosEstados(): Observable<EstadoIngrediente[]>{
    return this.httpClient.get<EstadoIngrediente[]>(`${this.baseUrlEstado}`);
  }

  registrarIngrediente(ingrediente: IIngrediente): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,ingrediente);
  }

  actualizarIngrediente(id: number, ingrediente: IIngrediente): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,ingrediente);
  }

  obtenerIngredientePorId(id: number): Observable<IIngrediente>{
    return this.httpClient.get<IIngrediente>(`${this.baseUrl}/${id}`);
  }

  eliminarIngrediente(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
