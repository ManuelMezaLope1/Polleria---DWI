import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CantidadVentas } from '../../componentes/consulta/CantidadVentas';
import { VentasManana } from '../../componentes/consultaml/VentasManana';
import { PlatosVentasMl } from '../../componentes/consultaml/PlatosVentasMl';
import { HistoricoPlatosMl } from '../../componentes/consultaml/HistoricoPlatosMl';
import { HistoricoFranjaPedidosMl } from '../../componentes/consultaml/HistoricoFranjaPedidosMl';

@Injectable({
  providedIn: 'root',
})
export class ConsultaMlServicio {
  private baseUrl = "http://localhost:8000/prediccion";

  constructor(private http: HttpClient) { }

  obtenerPrediccion(): Observable<VentasManana> {
    return this.http.get<VentasManana>(this.baseUrl + '/venta-mañana');
  }

  obtenerTotalVentaManana(): Observable<VentasManana> {
    return this.http.get<VentasManana>(this.baseUrl + '/venta-mañana-total');
  }

  obtenerTotalPlatosVentas(): Observable<PlatosVentasMl> {
    return this.http.get<PlatosVentasMl>(this.baseUrl + '/platos-ventas-ml');
  }

  obtenerHistoricoPlatos(): Observable<HistoricoPlatosMl[]>{
    return this.http.get<HistoricoPlatosMl[]>(this.baseUrl+'/historico-platos');
  }

  obtenerHistoricoFranjaPedidos(): Observable<HistoricoFranjaPedidosMl[]>{
    return this.http.get<HistoricoFranjaPedidosMl[]>(this.baseUrl+'/historico-franja-pedidos');
  }
}
