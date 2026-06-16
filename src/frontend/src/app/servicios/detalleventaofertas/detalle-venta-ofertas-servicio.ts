import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetalleVentaOfertasServicio {
  private baseUrl="http://localhost:8080/api/v1/public/detalle-venta-ofertas";

  constructor(private http: HttpClient){}

  guardarLote(relaciones: any[]){
    return this.http.post(this.baseUrl+'/lote',relaciones);
  }
}
