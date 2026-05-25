import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRol } from '../../componentes/rol/IRol';

@Injectable({
  providedIn: 'root',
})
export class RolServicio {
  private baseUrl="http://localhost:8080/api/v1/public/roles";

  constructor(private httpClient: HttpClient){}

  obtenerTodosLosRoles(): Observable<IRol[]>{
    return this.httpClient.get<IRol[]>(`${this.baseUrl}`);
  }

  registrarRol(rol: IRol): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,rol);
  }

  obtenerRolPorId(id: number): Observable<IRol>{
    return this.httpClient.get<IRol>(`${this.baseUrl}/${id}`);
  }

  actualizarRol(id: number, rol: IRol): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,rol);
  }

  eliminarRol(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
