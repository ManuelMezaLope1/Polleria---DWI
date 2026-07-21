import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { VentaServicio } from '../../../servicios/venta/venta-servicio';
import { Venta } from '../../../componentes/venta/Venta';
import { catchError, Observable, of, tap } from 'rxjs';
import { ConsultaServicio } from '../../../servicios/consulta/consulta-servicio';
import { CommonModule } from '@angular/common';
import { PedidoServicio } from '../../../servicios/pedido/pedido-servicio';
import { Pedido } from '../../../componentes/pedido/Pedido';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { ConsultaMlServicio } from '../../../servicios/consultaml/consulta-ml-servicio';
import { FranjaMayor } from '../../../componentes/consultaml/FranjaMayor';
import { CategoriaMayorMl } from '../../../componentes/consultaml/CategoriaMayorMl';
import { PlatoCrecimientoMl } from '../../../componentes/consultaml/PlatoCrecimientoMl';
import { MesaServicio } from '../../../servicios/mesa/mesa-servicio';
import { IMesa } from '../../../componentes/pedido/IMesa';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard-cocinero',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-cocinero.html',
  styleUrl: './dashboard-cocinero.css',
})
export class DashboardCocinero {
  ventas: Venta[] = [];
  pedidosPendientes: Pedido[] = [];
  pedidosPreparados: Pedido[] = [];
  pedidosListos: Pedido[] = [];
  pedidosObservaciones: Pedido[] = [];
  pedido: Pedido = new Pedido();
  usuario: any[] = []
  idPedido: any;
  idPedidoPreparado: any;

  idMesa: any;
  idMesaPreparado: any;
  mesa: IMesa = new IMesa();

  ingredientes: any[] = [];
  venta: Venta = new Venta();
  ventaId: any;
  ventaIdPreparado: any;

  cantidadPedidosPendientes: number = 0;
  cantidadPedidosPreparados: number = 0;
  cantidadPedidosListos: number = 0;

  cantidadPlatosPendientes: number = 0;
  cantidadPlatosPreparados: number = 0;
  cantidadPlatosListos: number = 0;

  mejorPlatoPedidoHoy: any[] = [];
  mejorPlatoPedidoHoyCantidad: number = 0;

  mejorOfertaPedidoHoy: any[] = [];
  mejorOfertaPedidoHoyCantidad: number = 0;
  mejorOfertaPedidoHoyNombre: string = '';

  mejorIngredientePedidoHoy: any[] = [];
  mejorIngredientePedidoHoyCantidad: number = 0;

  platosPreparar: any[] = [];
  historicoPlatos: any[] = [];
  historicoFranjaPedidos: any[] = [];
  recomendacionLotes: any[] = [];
  combinacionPlatos: any[] = [];

  franjaMayor!: FranjaMayor;
  franjasMayores: any[] = [];
  categoriaMayor!: CategoriaMayorMl;
  categoriasMayores: any[] = []
  platoCrecimientoMayor!: PlatoCrecimientoMl;
  platosCrecimientosMayores: any[] = [];
  pedidosSemanaPasada: any[] = [];

  constructor(private consultaServicio: ConsultaServicio, private consultaMlServicio: ConsultaMlServicio, private usuarioServicio: UsuarioServicio, private pedidoServicio: PedidoServicio, private ventaServicio: VentaServicio, private mesaServicio: MesaServicio, private cd: ChangeDetectorRef) { }

  abierto = false;
  active: string = 'inicio';
  activePedido: string = 'pendiente';

  @ViewChild('btnInfo')
  btnInfo!: ElementRef;

  @ViewChild('btnInfoInicio')
  btnInfoInicio!: ElementRef;

  @ViewChild('btnInfoPedidos')
  btnInfoPedidos!: ElementRef;

  @ViewChild('btnInfoIngredientes')
  btnInfoIngredientes!: ElementRef;

  @ViewChild('btnInfoPlatosPreparar')
  btnInfoPlatosPreparar!: ElementRef;

  @ViewChild('btnInfoRecomendaciones')
  btnInfoRecomendaciones!: ElementRef;

  @ViewChild('btnInfoPredicciones')
  btnInfoPredicciones!: ElementRef;

  @ViewChild('btnInfoEstadisticas')
  btnInfoEstadisticas!: ElementRef;

  mostrarTooltip() {
    if (!this.btnInfo?.nativeElement) {
      return;
    }

    const tooltip = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfo.nativeElement
    );

    tooltip.show();

    setTimeout(() => {
      try {
        tooltip.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipInicio() {
    if (!this.btnInfoInicio?.nativeElement) {
      return;
    }

    const tooltipInicio = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoInicio.nativeElement
    );

    tooltipInicio.show();

    setTimeout(() => {
      try {
        tooltipInicio.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipPedidos() {
    if (!this.btnInfoPedidos?.nativeElement) {
      return;
    }

    const tooltipPedidos = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoPedidos.nativeElement
    );

    tooltipPedidos.show();

    setTimeout(() => {
      try {
        tooltipPedidos.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipIngredientes() {
    if (!this.btnInfoIngredientes?.nativeElement) {
      return;
    }

    const tooltipIngredientes = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoIngredientes.nativeElement
    );

    tooltipIngredientes.show();

    setTimeout(() => {
      try {
        tooltipIngredientes.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipPlatosPreparar() {
    if (!this.btnInfoPlatosPreparar?.nativeElement) {
      return;
    }

    const tooltipPlatosPreparar = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoPlatosPreparar.nativeElement
    );

    tooltipPlatosPreparar.show();

    setTimeout(() => {
      try {
        tooltipPlatosPreparar.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipRecomendaciones() {
    if (!this.btnInfoRecomendaciones?.nativeElement) {
      return;
    }

    const tooltipRecomendacion = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoRecomendaciones.nativeElement
    );

    tooltipRecomendacion.show();

    setTimeout(() => {
      try {
        tooltipRecomendacion.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipPredicciones() {
    if (!this.btnInfoPredicciones?.nativeElement) {
      return;
    }

    const tooltipPrediccion = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoPredicciones.nativeElement
    );

    tooltipPrediccion.show();

    setTimeout(() => {
      try {
        tooltipPrediccion.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipEstadisticas() {
    if (!this.btnInfoEstadisticas?.nativeElement) {
      return;
    }

    const tooltipEstadisticas = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoEstadisticas.nativeElement
    );

    tooltipEstadisticas.show();

    setTimeout(() => {
      try {
        tooltipEstadisticas.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  onInicioTab() {
    this.active = "inicio";
  }

  onPedidosTab() {
    this.active = "pedidos";
  }

  onPendienteTab() {
    this.activePedido = "pendiente"
  }

  onPreparacionTab() {
    this.activePedido = "preparacion";
  }

  onListoTab() {
    this.activePedido = "listo";
  }

  onIngredientesTab() {
    this.active = "ingredientes";
  }

  onPlatosPrepararTab() {
    this.active = "platosPreparar";
  }

  onPrediccionesTab() {
    this.active = "predicciones";
  }

  onRecomendacionesTab() {
    this.active = "recomendaciones";
  }

  onEstadisticasTab() {
    this.active = "estadisticas";
  }

  ngOnInit(): void {
    this.cargarVentas();

    this.pedidoServicio.obtenerTodosLosPedidosPendientes().subscribe((dato: any) => {
      this.pedidosPendientes = dato;
      console.log(this.pedidosPendientes)
      this.cd.detectChanges();
    });

    this.pedidoServicio.obtenerTodosLosPedidosPreparados().subscribe(dato => {
      this.pedidosPreparados = dato;
      this.cd.detectChanges();
    });

    this.pedidoServicio.obtenerTodosLosPedidosListos().subscribe(dato => {
      this.pedidosListos = dato;
      this.cd.detectChanges();
    })

    this.usuarioServicio.obtenerPerfil().subscribe((dato: any) => {
      this.pedido.usuario = dato;
      this.pedido.username = dato.username;
      this.cd.detectChanges();
    });

    this.consultaServicio.obtenerTodosLosIngredientes().subscribe(dato => {
      this.ingredientes = dato;
      this.cd.detectChanges();
    });

    this.cargarCantidadPedidosPendientes();
    this.cargarCantidadPedidosPreparados();
    this.cargarCantidadPedidosListos();

    this.cargarPlatosPendientes();
    this.cargarPlatosPreparados();
    this.cargarPlatosListos();

    this.cargarMejorPlatoPedidoHoy();
    this.cargarMejorOfertaPedidoHoy();
    this.cargarMejorIngredientePedidoHoy();

    this.cargarPedidosConObservaciones();
    this.cargarPlatosAPreparar();

    this.cargarCantidadEstadoPedido();
    this.cargarFranjaPedidos();
    this.cargarCantidadDiaPedidos();

    this.cargarHistoricoPlatos();
    this.cargarHistoricoFranjaPedidos();
    this.cargarProduccionLotes();
    this.cargarCombinacionPlatos();
    this.cargarFranjaMayor();
    this.cargarCategoriaMayor();
    this.cargarPlatoCrecimientoMayor();
    this.cargarCantidadIngredientesPlato();
    this.cargarMayorCantidadPlatosVenta();
  }

  cargarVentas() {
    this.ventaServicio.obtenerVentas().subscribe(datos => {
      this.ventas = datos;
      this.cd.detectChanges();
    })
  }

  actualizarPedidoPendiente(id: number, idVenta: number, idMesa: number) {
    this.idPedido = id;
    this.idMesa = idMesa;
    this.ventaId = idVenta;
    this.cd.detectChanges();

    this.pedido.fecha_creacion = new Date().toLocaleString();

    console.log(this.idPedido)
    console.log(this.ventaId)
    console.log(this.idMesa)

    this.pedidoServicio.actualizarPedidoPendiente(this.idPedido, this.pedido).pipe(
      tap(dato => {
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()

    this.mesaServicio.actualizarMesaPendiente(this.idMesa, this.mesa).pipe(
      tap(dato => {
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()

    this.ventaServicio.actualizarVentaPendiente(this.ventaId, this.venta).pipe(
      tap(data => {
        window.location.reload()
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe()
  }

  actualizarPedidoPreparado(id: number, idVenta: number, idMesa: number) {
    this.idPedidoPreparado = id;
    this.idMesaPreparado = idMesa;
    this.ventaIdPreparado = idVenta;

    this.pedido.fecha_entrega = new Date().toLocaleString();

    this.pedidoServicio.actualizarPedidoPreparado(this.idPedidoPreparado, this.pedido).pipe(
      tap(dato => {
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()

    this.mesaServicio.actualizarMesaPreparado(this.idMesaPreparado, this.mesa).pipe(
      tap(dato => {
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()

    this.ventaServicio.actualizarVentaPreparada(this.ventaIdPreparado, this.venta).pipe(
      tap(data => {
        window.location.reload()
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe()
  }

  cargarCantidadPedidosPendientes(): void {
    this.consultaServicio.obtenerCantidadPedidosPendientes().subscribe(dato => {
      if (dato === null) {
        this.cantidadPlatosPreparados = 0;
      } else {
        this.cantidadPedidosPendientes = dato.cantidad;
      }
      this.cd.detectChanges();
    })
  }

  cargarCantidadPedidosPreparados(): void {
    this.consultaServicio.obtenerCantidadPedidosPreparados().subscribe(dato => {
      if (dato === null) {
        this.cantidadPlatosPreparados = 0;
      } else {
        this.cantidadPedidosPreparados = dato.cantidad;
      }
      this.cd.detectChanges();
    })
  }

  cargarCantidadPedidosListos(): void {
    this.consultaServicio.obtenerCantidadPedidosListos().subscribe(dato => {
      if (dato === null) {
        this.cantidadPlatosPreparados = 0;
      } else {
        this.cantidadPedidosListos = dato.cantidad;
      }
      this.cd.detectChanges();
    })
  }

  cargarPlatosPendientes(): void {
    this.consultaServicio.obtenerPlatosPendientes().subscribe(dato => {
      if (dato === null) {
        this.cantidadPlatosPreparados = 0;
      } else {
        this.cantidadPlatosPendientes = dato.cantidad;
      }
      this.cd.detectChanges();
    })
  }

  cargarPlatosPreparados(): void {
    this.consultaServicio.obtenerPlatosPreparados().subscribe(dato => {
      if (dato === null) {
        this.cantidadPlatosPreparados = 0;
      } else {
        this.cantidadPlatosPreparados = dato.cantidad;
      }
      this.cd.detectChanges();
    })
  }

  cargarPlatosListos(): void {
    this.consultaServicio.obtenerPlatosListos().subscribe(dato => {
      if (dato === null) {
        this.cantidadPlatosPreparados = 0;
      } else {
        this.cantidadPlatosListos = dato.cantidad;
      }
      this.cd.detectChanges();
    })
  }

  cargarMejorPlatoPedidoHoy(): void {
    this.consultaServicio.obtenerMejorPlatoPedidoHoy().subscribe((dato: any) => {
      this.mejorPlatoPedidoHoy = dato;
      this.cd.detectChanges();
    })
  }

  cargarMejorOfertaPedidoHoy(): void {
    this.consultaServicio.obtenerMejorOfertaPedidoHoy().subscribe((dato: any) => {
      this.mejorOfertaPedidoHoy = dato;
      if (this.mejorOfertaPedidoHoy.length > 0) {
        this.mejorOfertaPedidoHoyNombre = dato[0].nombre;
        this.cd.detectChanges();
      }
    })
  }

  cargarMejorIngredientePedidoHoy(): void {
    this.consultaServicio.obtenerMejorIngredientePedidoHoy().subscribe((dato: any) => {
      this.mejorIngredientePedidoHoy = dato;
      this.cd.detectChanges();
    })
  }

  cargarPedidosConObservaciones(): void {
    this.consultaServicio.obtenerPedidosConObservaciones().subscribe(dato => {
      this.pedidosObservaciones = dato;
      this.cd.detectChanges();
    })
  }

  cargarPlatosAPreparar(): void {
    this.consultaServicio.obtenerPlatosPreparar().subscribe(dato => {
      this.platosPreparar = dato;
      this.cd.detectChanges();
    })
  }

  cargarCantidadEstadoPedido(): void {
    this.consultaServicio.obtenerCantidadEstadoPedido().subscribe(datos => {
      new Chart('cantidadEstadoPedidoChart', {
        type: 'pie',
        data: {
          labels: datos.map(d => d.nombre),
          datasets: [{
            label: 'Cantidad de Estados de Pedidos',
            data: datos.map(d => d.cantidad)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Pedidos por Estado'
            }
          }
        }
      });
      this.cd.detectChanges();
    })
  }

  cargarFranjaPedidos(): void {
    this.consultaServicio.obtenerFranjaPedidos().subscribe(datos => {
      new Chart('franjaPedidosChart', {
        type: 'doughnut',
        data: {
          labels: datos.map(d => d.franja),
          datasets: [{
            label: 'Cantidad de Pedidos por Franja',
            data: datos.map(d => d.cantidad)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Pedidos por Franja'
            }
          }
        }
      });
      this.cd.detectChanges();
    })
  }

  cargarCantidadDiaPedidos(): void {
    this.consultaServicio.obtenerCantidadDiaPedidos().subscribe(datos => {
      this.pedidosSemanaPasada = datos;
      if (this.pedidosSemanaPasada.length > 0) {
        this.cd.detectChanges()
        new Chart('diaPedidosChart', {
          type: 'bar',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Pedidos por Dia',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Pedidos por Dia'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarCantidadIngredientesPlato() {
    this.consultaServicio.obtenerCantidadIngredientesPlato().subscribe(datos => {
      new Chart('cantidadIngredientesPlatoChart', {
        type: 'bar',
        data: {
          labels: datos.map(d => d.nombre),
          datasets: [{
            label: 'Cantidad de Ingredientes por Plato',
            data: datos.map(d => d.cantidad)
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Ingredientes por Plato'
            }
          }
        }
      });
      this.cd.detectChanges();
    })
  }

  cargarMayorCantidadPlatosVenta() {
    this.consultaServicio.obtenerMayorCantidadPlatosVenta().subscribe(datos => {
      new Chart('mayorCantidadPlatosVentaChart', {
        type: 'bar',
        data: {
          labels: datos.map(d => d.nombre),
          datasets: [{
            label: 'Cantidad de Platos por Venta',
            data: datos.map(d => d.cantidad)
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Platos por Venta'
            }
          }
        }
      });
      this.cd.detectChanges();
    })
  }

  cargarHistoricoPlatos() {
    this.consultaMlServicio.obtenerHistoricoPlatos().subscribe(datos => {
      this.historicoPlatos = datos;
      this.historicoPlatos = this.historicoPlatos.sort((a, b) => b.cantidadManana - a.cantidadManana).slice(0, 6)
      this.cd.detectChanges();
    })
  }

  cargarHistoricoFranjaPedidos(): void {
    this.consultaMlServicio.obtenerHistoricoFranjaPedidos().subscribe(datos => {
      this.historicoFranjaPedidos = datos;
      this.cd.detectChanges();
    })
  }

  cargarProduccionLotes(): void {
    this.consultaMlServicio.obtenerRecomendacionLotes().subscribe(datos => {
      this.recomendacionLotes = datos;
      this.cd.detectChanges();
    })
  }

  cargarCombinacionPlatos(): void {
    this.consultaMlServicio.obtenerCombinaciones().subscribe(datos => {
      this.combinacionPlatos = datos;
      this.cd.detectChanges();
    })
  }

  cargarFranjaMayor() {
    this.consultaMlServicio.obtenerMayorFranjaHoraria().subscribe(datos => {
      this.franjaMayor = datos;
      this.franjasMayores = this.franjaMayor.predicciones.map(({ franja, cantidadManana }) => ({
        franja, cantidadManana
      }))
      this.cd.detectChanges();
    })
  }

  cargarCategoriaMayor() {
    this.consultaMlServicio.obtenerMayorCategoria().subscribe(datos => {
      this.categoriaMayor = datos;
      this.categoriasMayores = this.categoriaMayor.categorias.map(({ categoria, cantidadManana }) => ({
        categoria, cantidadManana
      })).slice(0, 5)
      this.cd.detectChanges();
    })
  }

  cargarPlatoCrecimientoMayor() {
    this.consultaMlServicio.obtenerMayorPlatoCrecimiento().subscribe(datos => {
      this.platoCrecimientoMayor = datos;
      this.platosCrecimientosMayores = this.platoCrecimientoMayor.platos.map(({ nombre, promedio, cantidadManana, crecimiento }) => ({
        nombre, promedio, cantidadManana, crecimiento
      })).slice(0, 5)
      this.cd.detectChanges();
    })
  }
}