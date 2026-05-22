import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleVenta } from '../../componentes/venta/DetalleVenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetalleVentaServicio {
  private baseUrl="http://localhost:8080/api/v1/private/detalles-ventas";

  constructor(private httpClient: HttpClient){}

  registrarDetalleVenta(detalleVenta: DetalleVenta): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,detalleVenta);
  }
}
