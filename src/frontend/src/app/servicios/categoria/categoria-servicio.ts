import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../componentes/categoria/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaServicio {
  private baseURL="http://localhost:8080/api/v1/categorias";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeCategorias(): Observable<Categoria[]>{
    return this.HttpClient.get<Categoria[]>(`${this.baseURL}`);
  }

  registrarCategoria(categoria: Categoria): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`, categoria);
  }

  actualizarCategoria(id:number, categoria: Categoria): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`, categoria);
  }

  obtenerCategoriaPorId(id:number): Observable<Categoria>{
    return this.HttpClient.get<Categoria>(`${this.baseURL}/${id}`);
  }

  eliminarCategoria(id:number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
