import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../../componentes/pedido/Pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoServicio {
  private baseUrlPreparados="http://localhost:8080/api/v1/public/pedidos-preparados";
  private baseUrlPendiente="http://localhost:8080/api/v1/public/pedidos-pendientes";
  private baseUrlListo="http://localhost:8080/api/v1/public/pedidos-listos";
  private baseUrl="http://localhost:8080/api/v1/public/pedidos";

  constructor(private http: HttpClient){}

  obtenerTodosLosPedidosPendientes(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.baseUrlPendiente}`);
  }

  obtenerTodosLosPedidosPreparados(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.baseUrlPreparados}`);
  }

  obtenerTodosLosPedidosListos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.baseUrlListo}`)
  }

  registrarPedido(pedido: Pedido): Observable<Object>{
    return this.http.post(`${this.baseUrl}`, pedido);
  }

  actualizarPedidoPendiente(id: number, pedido: Pedido): Observable<Object>{
    return this.http.put(`${this.baseUrlPendiente}/${id}`, pedido);
  }

  actualizarPedidoPreparado(id: number, pedido: Pedido): Observable<Object>{
    return this.http.put(`${this.baseUrlPreparados}/${id}`,pedido);
  }
}
