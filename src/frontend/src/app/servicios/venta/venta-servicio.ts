import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../../componentes/venta/Venta';

@Injectable({
  providedIn: 'root',
})
export class VentaServicio {
  private baseUrl="http://localhost:8080/api/v1/private/ventas";

  constructor(private httpClient: HttpClient){}

  registrarVenta(venta: Venta): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,venta);
  }

  obtenerVentas(): Observable<Venta[]>{
    return this.httpClient.get<Venta[]>(`${this.baseUrl}`);
  }
}
