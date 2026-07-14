import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CantidadVentas } from '../../componentes/consulta/CantidadVentas';
import { VentasManana } from '../../componentes/consultaml/VentasManana';
import { PlatosVentasMl } from '../../componentes/consultaml/PlatosVentasMl';
import { HistoricoPlatosMl } from '../../componentes/consultaml/HistoricoPlatosMl';
import { HistoricoFranjaPedidosMl } from '../../componentes/consultaml/HistoricoFranjaPedidosMl';
import { PlatosRecomendacion } from '../../componentes/consultaml/PlatosRecomendacion';
import { TendenciaVentas } from '../../componentes/consultaml/TendenciaVentas';
import { FranjaMayor } from '../../componentes/consultaml/FranjaMayor';
import { CategoriaMayorMl } from '../../componentes/consultaml/CategoriaMayorMl';
import { PlatoCrecimientoMl } from '../../componentes/consultaml/PlatoCrecimientoMl';
import { RecomendacionOfertasMl } from '../../componentes/consultaml/RecomendacionOfertasMl';
import { ProduccionLotes } from '../../componentes/consultaml/ProduccionLotes';
import { CombinacionPlatosMl } from '../../componentes/consultaml/CombinacionPlatosMl';

@Injectable({
  providedIn: 'root',
})
export class ConsultaMlServicio {
  private baseUrl = "http://localhost:8000/prediccion";
  private baseUrlRecomendacion="http://localhost:8000/recomendacion";

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

  obtenerCantidadPlatosRecomendacion(): Observable<PlatosRecomendacion[]>{
    return this.http.get<PlatosRecomendacion[]>(this.baseUrl+'/cantidad-platos-recomendaciones');
  }

  obtenerHistoricoVentas(): Observable<TendenciaVentas>{
    return this.http.get<TendenciaVentas>(this.baseUrl+'/historico-ventas');
  }

  obtenerMayorFranjaHoraria(): Observable<FranjaMayor>{
    return this.http.get<FranjaMayor>(this.baseUrl+'/mayor-franja-horaria');
  }

  obtenerMayorCategoria():Observable<CategoriaMayorMl>{
    return this.http.get<CategoriaMayorMl>(this.baseUrl+'/historico-categoria-ventas');
  }

  obtenerMayorPlatoCrecimiento(): Observable<PlatoCrecimientoMl>{
    return this.http.get<PlatoCrecimientoMl>(this.baseUrl+'/plato-crecimiento');
  }

  obtenerRecomendacionOfertas(): Observable<RecomendacionOfertasMl[]>{
    return this.http.get<RecomendacionOfertasMl[]>(this.baseUrlRecomendacion+'/ofertas');
  }

  obtenerRecomendacionLotes(): Observable<ProduccionLotes[]>{
    return this.http.get<ProduccionLotes[]>(this.baseUrlRecomendacion+'/produccion');
  }

  obtenerCombinaciones():Observable<CombinacionPlatosMl[]>{
    return this.http.get<CombinacionPlatosMl[]>(this.baseUrlRecomendacion+'/combinaciones');
  }
}
