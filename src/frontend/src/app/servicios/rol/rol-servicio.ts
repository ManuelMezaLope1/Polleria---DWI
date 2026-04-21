import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../../componentes/rol/Rol';

@Injectable({
  providedIn: 'root',
})
export class RolServicio {
  private baseUrl="empowering-optimism-production-1bee.up.railway.app/api/v1/roles";

  constructor(private HttpClient:HttpClient){}

  obtenerListaDeRoles(): Observable<Rol[]>{
    return this.HttpClient.get<Rol[]>(`${this.baseUrl}`);
  }

  registrarRol(rol: Rol): Observable<Object>{
    return this.HttpClient.post(`${this.baseUrl}`,rol);
  }

  actualizarRol(id:number, rol:Rol): Observable<Object>{
    return this.HttpClient.put(`${this.baseUrl}/${id}`,rol);
  }

  obtenerRolPorId(id:number): Observable<Rol>{
    return this.HttpClient.get<Rol>(`${this.baseUrl}/${id}`);
  }

  eliminarRol(id:number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseUrl}/${id}`);
  }
}
