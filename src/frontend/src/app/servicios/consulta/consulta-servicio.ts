import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CantidadVentas } from '../../componentes/consulta/CantidadVentas';
import { UsuarioVentas } from '../../componentes/consulta/UsuarioVentas';
import { CategoriaPlatos } from '../../componentes/consulta/CategoriaPlatos';
import { VentasHoy } from '../../componentes/consulta/VentasHoy.';
import { Top3VentasDesc } from '../../componentes/consulta/Top3VentasDesc';
import { PlatosPorVentas } from '../../componentes/consulta/PlatosPorVentas';
import { OfertasPorVentas } from '../../componentes/consulta/OfertasPorVentas';
import { CantidadMetodoPago } from '../../componentes/consulta/CantidadMetodoPago';
import { UsuariosFrecuentes } from '../../componentes/consulta/UsuariosFrecuentes';
import { MejorUsuario } from '../../componentes/consulta/MejorUsuario';
import { MejorPlato } from '../../componentes/consulta/MejorPlato';
import { MejorOferta } from '../../componentes/consulta/MejorOferta';
import { MejorZona } from '../../componentes/consulta/MejorZona';
import { TodosIngredientes } from '../../componentes/consulta/TodosIngredientes';
import { MejorPlatoPedidoHoy } from '../../componentes/consulta/MejorPlatoPedidoHoy';
import { MejorOfertaPedidoHoy } from '../../componentes/consulta/MejorOfertaPedidoHoy';
import { Pedido } from '../../componentes/pedido/Pedido';
import { PlatosPreparar } from '../../componentes/consulta/PlatosPreparar';
import { FranjaPedidos } from '../../componentes/consulta/FranjaPedidos';
import { VentaActualMesa } from '../../componentes/consulta/VentaActualMesa';

@Injectable({
  providedIn: 'root',
})
export class ConsultaServicio {
  private baseUrl="http://localhost:8080/api/v1/public";

  constructor(private http: HttpClient){}

  obtenerCantidadVentas(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl + '/cantidad-ventas');
  }

  obtenerCantidadUsuarios(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl + '/cantidad-usuarios');
  }

  obtenerCantidadAlergias(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl + '/cantidad-alergias');
  }

  obtenerCantidadCategorias(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl + '/cantidad-categorias');
  }

  obtenerCantidadPlatos(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl + '/cantidad-platos');
  }

  obtenerCantidadIngredientes(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl + '/cantidad-ingredientes');
  }

  obtenerCantidadOfertas(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl + '/cantidad-ofertas');
  }
  
  obtenerCantidadZonas(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl + '/cantidad-zonas');
  }

  obtenerPlatosPendientes(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl+'/cantidad-platos-pendientes');
  }

  obtenerPlatosPreparados(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl+'/cantidad-platos-preparados');
  }

  obtenerPlatosListos(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl+'/cantidad-platos-listos');
  }

  obtenerCantidadMetodoPago(): Observable<CantidadMetodoPago[]>{
    return this.http.get<CantidadMetodoPago[]>(this.baseUrl+'/cantidad-metodopago');
  }

  obtenerUsuarioVentas(): Observable<UsuarioVentas[]>{
    return this.http.get<UsuarioVentas[]>(this.baseUrl+'/usuario-ventas');
  }

  obtenerCategoriaPlatos(): Observable<CategoriaPlatos[]>{
    return this.http.get<CategoriaPlatos[]>(this.baseUrl+'/categoria-platos');
  }

  obtenerVentasPorZona(): Observable<CantidadMetodoPago[]>{
    return this.http.get<CantidadMetodoPago[]>(this.baseUrl+'/ventas-zonas');
  }

  obtenerUsuariosMasFrecuentes(): Observable<UsuariosFrecuentes[]>{
    return this.http.get<UsuariosFrecuentes[]>(this.baseUrl+'/usuarios-frecuentes');
  }

  obtenerVentasHoy(): Observable<VentasHoy>{
    return this.http.get<VentasHoy>(this.baseUrl+'/ventas-hoy');
  }

  obtenerVentasSemana(): Observable<VentasHoy>{
    return this.http.get<VentasHoy>(this.baseUrl+'/ventas-semana');
  }

  obtenerVentasMes(): Observable<VentasHoy>{
    return this.http.get<VentasHoy>(this.baseUrl+'/ventas-mes');
  }

  obtenerTop3VentasDesc(): Observable<Top3VentasDesc[]>{
    return this.http.get<Top3VentasDesc[]>(this.baseUrl+'/detalles-ventas-consulta');
  }

  obtenerPlatosPorVentas(): Observable<PlatosPorVentas[]>{
    return this.http.get<PlatosPorVentas[]>(this.baseUrl+'/platos-ventas');
  }

  obtenerOfertasPorVentas(): Observable<OfertasPorVentas[]>{
    return this.http.get<OfertasPorVentas[]>(this.baseUrl+'/ofertas-ventas');
  }

  obtenerMejorUsuario(): Observable<MejorUsuario>{
    return this.http.get<MejorUsuario>(this.baseUrl+'/mejor-usuario');
  }

  obtenerMejorPlato(): Observable<MejorPlato>{
    return this.http.get<MejorPlato>(this.baseUrl+'/mejor-plato');
  }

   obtenerMejorOferta(): Observable<MejorOferta>{
    return this.http.get<MejorOferta>(this.baseUrl+'/mejor-oferta');
  }

  obtenerMejorZona(): Observable<MejorZona>{
    return this.http.get<MejorZona>(this.baseUrl+'/mejor-zona');
  }

  obtenerTodosLosIngredientes(): Observable<TodosIngredientes[]>{
    return this.http.get<TodosIngredientes[]>(this.baseUrl+'/todos-ingredientes');
  }

  obtenerCantidadPedidosPendientes(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl+'/cantidad-pedidos-pendientes');
  }

  obtenerCantidadPedidosPreparados(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl+'/cantidad-pedidos-preparados');
  }

  obtenerCantidadPedidosListos(): Observable<CantidadVentas>{
    return this.http.get<CantidadVentas>(this.baseUrl+'/cantidad-pedidos-listos');
  }

  obtenerMejorPlatoPedidoHoy(): Observable<MejorPlatoPedidoHoy[]>{
    return this.http.get<MejorPlatoPedidoHoy[]>(this.baseUrl+'/mejor-plato-pedido-hoy', );
  }

  obtenerMejorOfertaPedidoHoy(): Observable<MejorOfertaPedidoHoy[]>{
    return this.http.get<MejorOfertaPedidoHoy[]>(this.baseUrl+'/mejor-oferta-pedido-hoy');
  }

  obtenerMejorIngredientePedidoHoy(): Observable<MejorOfertaPedidoHoy[]>{
    return this.http.get<MejorOfertaPedidoHoy[]>(this.baseUrl+'/mejor-ingrediente-pedido-hoy');
  }

  obtenerPedidosConObservaciones(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+'/pedidos-observaciones');
  }

  obtenerPlatosPreparar(): Observable<PlatosPreparar[]>{
    return this.http.get<PlatosPreparar[]>(this.baseUrl+'/platos-preparar');
  }

  obtenerCantidadEstadoPedido(): Observable<CantidadMetodoPago[]>{
    return this.http.get<CantidadMetodoPago[]>(this.baseUrl+'/cantidad-estado-pedido');
  }

  obtenerFranjaPedidos(): Observable<FranjaPedidos[]>{
    return this.http.get<FranjaPedidos[]>(this.baseUrl+'/franja-pedidos');
  }

  obtenerCantidadDiaPedidos(): Observable<CantidadMetodoPago[]>{
    return this.http.get<CantidadMetodoPago[]>(this.baseUrl+'/dia-pedidos');
  }

  obtenerOfertaCantidadPlatos(): Observable<CantidadMetodoPago[]>{
    return this.http.get<CantidadMetodoPago[]>(this.baseUrl+'/oferta-cantidad-platos');
  }

  obtenerAlergiaCantidadIngredientes(): Observable<CantidadMetodoPago[]>{
    return this.http.get<CantidadMetodoPago[]>(this.baseUrl+'/alergia-ingredientes');
  }

  obtenerCategoriaCantidadIngredientes(): Observable<CantidadMetodoPago[]>{
    return this.http.get<CantidadMetodoPago[]>(this.baseUrl+'/categoria-cantidad-ingredientes');
  }

  obtenerCantidadIngredientesPlato(): Observable<CantidadMetodoPago[]>{
    return this.http.get<CantidadMetodoPago[]>(this.baseUrl+'/plato-cantidad-ingredientes');
  }

  obtenerMayorCantidadPlatosVenta(): Observable<CantidadMetodoPago[]>{
    return this.http.get<CantidadMetodoPago[]>(this.baseUrl+'/mayor-cantidad-platos-venta');
  }

  obtenerPedidoActualMesa(mesaId: number): Observable<VentaActualMesa[]>{
    return this.http.get<VentaActualMesa[]>(this.baseUrl+'/venta-pedido-actual',
      {
        params: {
          mesaId: mesaId
        }
      }
    );
  }

  obtenerVentasPorMesa(mesaId: number): Observable<VentaActualMesa[]>{
    return this.http.get<VentaActualMesa[]>(this.baseUrl+'/ventas-mesa',
      {
        params: {
          mesaId: mesaId
        }
      }
    );
  }
}