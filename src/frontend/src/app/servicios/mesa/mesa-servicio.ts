import { Injectable } from '@angular/core';
import { Mesa } from '../../paginas/admin/mesa/mesa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMesa } from '../../componentes/pedido/IMesa';

@Injectable({
  providedIn: 'root',
})
export class MesaServicio {
  private baseUrl="http://localhost:8080/api/v1/public/mesas";

  constructor(private http: HttpClient){}

  obtenerMesaCuatro(): Observable<IMesa[]>{
    return this.http.get<IMesa[]>(this.baseUrl+'-cuatro');
  }

  obtenerMesSeis(): Observable<IMesa[]>{
    return this.http.get<IMesa[]>(this.baseUrl+'-seis');
  }

  obtenerMesaOcho(): Observable<IMesa[]>{
    return this.http.get<IMesa[]>(this.baseUrl+'-ocho');
  }

  obtenerMesaDiez(): Observable<IMesa[]>{
    return this.http.get<IMesa[]>(this.baseUrl+'-diez');
  }

  registrarMesas(mesa: IMesa): Observable<Object>{
    return this.http.post(`${this.baseUrl}`,mesa);
  }
}
