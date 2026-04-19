import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../componentes/usuario/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {
  private baseURL="http://localhost:8080/api/v1/usuarios";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeUsuarios(): Observable<Usuario[]>{
    return this.HttpClient.get<Usuario[]>(`${this.baseURL}`);
  }

  registrarUsuario(usuario: Usuario): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`, usuario);
  }

  actualizarUsuario(id:number, usuario:Usuario): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`,usuario);
  }

  obtenerUsuarioPorId(id:number): Observable<Usuario>{
    return this.HttpClient.get<Usuario>(`${this.baseURL}/${id}`);
  }

  eliminarUsuario(id:number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
