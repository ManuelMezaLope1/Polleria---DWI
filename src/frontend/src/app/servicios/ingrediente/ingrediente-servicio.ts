import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIngrediente } from '../../componentes/ingrediente/IIngrediente';

@Injectable({
  providedIn: 'root',
})
export class IngredienteServicio {
  private baseUrl="http://localhost:8080/api/v1/public/ingredientes";

  constructor(private httpClient: HttpClient){}

  obtenerTodosLosIngredientes(): Observable<IIngrediente[]>{
    return this.httpClient.get<IIngrediente[]>(`${this.baseUrl}`);
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
