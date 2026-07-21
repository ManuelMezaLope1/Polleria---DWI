import { Injectable } from '@angular/core';
import { Mesa } from '../../paginas/admin/mesa/mesa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMesa } from '../../componentes/pedido/IMesa';
import { VentasHoy } from '../../componentes/consulta/VentasHoy.';
import { CantidadVentas } from '../../componentes/consulta/CantidadVentas';
import { CantidadesVentasMesa } from '../../componentes/consulta/CantidadesVentasMesa';

@Injectable({
  providedIn: 'root',
})
export class MesaServicio {
  private baseUrl = "http://localhost:8080/api/v1/public/mesas";
  private baseUrlLibre="http://localhost:8080/api/v1/public/mesas-libres";
  private baseUrlPendiente="http://localhost:8080/api/v1/public/mesas-pendientes";
  private baseUrlPreparado="http://localhost:8080/api/v1/public/mesas-preparadas";
  private baseUrlListo="http://localhost:8080/api/v1/public/mesas-listas";

  constructor(private http: HttpClient) { }

  obtenerTodasLasMesas(): Observable<IMesa[]> {
    return this.http.get<IMesa[]>(this.baseUrl);
  }

  obtenerMesaCuatro(): Observable<IMesa[]> {
    return this.http.get<IMesa[]>(this.baseUrl + '-cuatro');
  }

  obtenerMesaSeis(): Observable<IMesa[]> {
    return this.http.get<IMesa[]>(this.baseUrl + '-seis');
  }

  obtenerMesaOcho(): Observable<IMesa[]> {
    return this.http.get<IMesa[]>(this.baseUrl + '-ocho');
  }

  obtenerMesaDiez(): Observable<IMesa[]> {
    return this.http.get<IMesa[]>(this.baseUrl + '-diez');
  }

  registrarMesas(mesa: IMesa): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, mesa);
  }

  obtenerMesaPorId(id: number): Observable<IMesa> {
    return this.http.get<IMesa>(`${this.baseUrl}/${id}`);
  }

  obtenerCantidadTotalVentasMesa(): Observable<VentasHoy>{
    return this.http.get<VentasHoy>(this.baseUrl+'-cantidad-total-ventas');
  }

  obtenerCantidadPlatosMesa(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl+'-cantidad-platos');
  }

  obtenerCantidadOfertasMesa(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl+'-cantidad-ofertas');
  }

  obtenerCantidadesVentasMesa(): Observable<CantidadesVentasMesa[]>{
    return this.http.get<CantidadesVentasMesa[]>(this.baseUrl+'-cantidades-ventas');
  }

  actualizarMesa(id: number, mesa: IMesa): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, mesa);
  }

  actualizarMesaLibre(id: number, mesa: IMesa): Observable<Object> {
    return this.http.put(`${this.baseUrlLibre}/${id}`, mesa);
  }

  actualizarMesaPendiente(id: number, mesa: IMesa): Observable<Object> {
    return this.http.put(`${this.baseUrlPendiente}/${id}`, mesa);
  }

  actualizarMesaPreparado(id: number, mesa: IMesa): Observable<Object> {
    return this.http.put(`${this.baseUrlPreparado}/${id}`, mesa);
  }

  actualizarMesaLista(id: number, mesa: IMesa): Observable<Object> {
    return this.http.put(`${this.baseUrlListo}/${id}`, mesa);
  }
}
