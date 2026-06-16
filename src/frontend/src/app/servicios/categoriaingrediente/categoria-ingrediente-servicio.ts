import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaIngrediente } from '../../componentes/categoriaingrediente/CategoriaIngrediente';

@Injectable({
  providedIn: 'root',
})
export class CategoriaIngredienteServicio {
  private baseUrl="http://localhost:8080/api/v1/public/categoria-ingrediente"

  constructor(private http: HttpClient){}

  obtenerTodasLasCategorias(): Observable<CategoriaIngrediente[]>{
    return this.http.get<CategoriaIngrediente[]>(`${this.baseUrl}`);
  }

  registrarCategoria(categoria: CategoriaIngrediente): Observable<Object>{
    return this.http.post(`${this.baseUrl}`,categoria);
  }

  obtenerCategoriaPorId(id: number): Observable<CategoriaIngrediente>{
    return this.http.get<CategoriaIngrediente>(`${this.baseUrl}/${id}`);
  }

  actualizarCategoria(id: number, categoria: CategoriaIngrediente): Observable<Object>{
    return this.http.put(`${this.baseUrl}/${id}`, categoria);
  }
}
