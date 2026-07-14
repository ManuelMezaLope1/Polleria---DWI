import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsultaServicio } from '../../../servicios/consulta/consulta-servicio';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { ConsultaMlServicio } from '../../../servicios/consultaml/consulta-ml-servicio';
import { TendenciaVentas } from '../../../componentes/consultaml/TendenciaVentas';
import { FranjaMayor } from '../../../componentes/consultaml/FranjaMayor';
import { CategoriaMayorMl } from '../../../componentes/consultaml/CategoriaMayorMl';
import { PlatoCrecimientoMl } from '../../../componentes/consultaml/PlatoCrecimientoMl';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  active: string = "inicio";
  abierto= false;

  fechaActual = new Date();

  cantidadVentas: number = 0;
  cantidadUsuarios: number = 0;
  cantidadCategorias: number = 0;
  cantidadPlatos: number = 0;
  cantidadAlergias: number = 0;
  cantidadZonas: number = 0;
  cantidadIngredientes: number = 0;
  cantidadOfertas: number = 0;

  ventasHoy: number = 0;
  totalVentasHoy: number = 0;
  ventasSemana: number = 0;
  totalVentasSemana: number = 0;
  ventasMes: number = 0;
  totalVentasMes: number = 0;
  ventas: any[] = [];

  usuarioUsername: string = '';
  usuarioNombre: string = '';
  usuarioApellido: string = '';
  usuarioTelefono: string = '';
  usuarioZona: string = '';
  usuarioCantidad: number = 0;
  usuarioTotal: number = 0;

  platoNombre: string = '';
  platoCategoria: string = '';
  platoPrecio: number = 0;
  platoImagen: string = '';
  platoCantidad: number = 0;
  platoTotal: number = 0;

  platoVentasChart: any[] = [];
  ofertaVentaChart: any[] = [];
  metodoPagoChart: any[] = [];
  ventaZonaChart: any[] = [];
  usuariosFrecuentesChart: any[] = [];
  ofertasCantidadPlatosChart: any[] = [];
  categoriaPlatosChart: any[] = [];
  alergiaCantidadIngredientesChart: any[] = [];
  categoriaCantidadIngredientesChart: any[] = [];

  ofertaNombre: string = '';
  ofertaDescripcion: string = '';
  ofertaPrecioNuevo: number = 0;
  ofertaPlatos: number = 0;
  ofertaCantidad: number = 0;
  ofertaTotal: number = 0;

  zonaNombre: string = '';
  zonaDepartamento: string = '';
  zonaProvincia: string = '';
  zonaCantidad: number = 0;
  zonaTotal: number = 0;

  franjaMayor!: FranjaMayor;
  franjasMayores: any[] = [];
  categoriaMayor!: CategoriaMayorMl;
  categoriasMayores: any[] = []
  platoCrecimientoMayor!: PlatoCrecimientoMl;
  platosCrecimientosMayores: any[] = [];

  graficoUsuarioVentas!: Chart;

  ventasManana: number = 0;
  totalVentasManana: number = 0;
  platosVentasManana: number = 0;
  recomendaciones: any[] = [];
  platosRecomendacion: any[] = [];
  clientesVip: any[] = [];
  clientesFrecuentes: any[] = [];
  clientesOcasionales: any[] = [];
  ofertasRecomendacion: any[] = [];
  recomendacionesOfertas: any[] = [];

  tendencia!: TendenciaVentas;
  chart!: Chart;

  constructor(private consultaServicio: ConsultaServicio, private consultaMlServicio: ConsultaMlServicio, private cd: ChangeDetectorRef) { }

  @ViewChild('btnInfo')
  btnInfo!: ElementRef;

  @ViewChild('btnInfoInicio')
  btnInfoInicio!: ElementRef;

  @ViewChild('btnInfoVentas')
  btnInfoVentas!: ElementRef;

  @ViewChild('btnInfoGraficos')
  btnInfoGraficos!: ElementRef;

  @ViewChild('btnInfoRecomendaciones')
  btnInfoRecomendaciones!: ElementRef;

  @ViewChild('btnInfoPredicciones')
  btnInfoPredicciones!: ElementRef;

  @ViewChild('btnInfoMejores')
  btnInfoMejores!: ElementRef;

  @ViewChild('btnInfoGestion')
  btnInfoGestion!: ElementRef;

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

  mostrarTooltipVentas() {
    if (!this.btnInfoVentas?.nativeElement) {
      return;
    }

    const tooltipVentas = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoVentas.nativeElement
    );

    tooltipVentas.show();

    setTimeout(() => {
      try {
        tooltipVentas.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipGraficos() {
    if (!this.btnInfoGraficos?.nativeElement) {
      return;
    }

    const tooltipGraficos = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoGraficos.nativeElement
    );

    tooltipGraficos.show();

    setTimeout(() => {
      try {
        tooltipGraficos.hide();
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

  mostrarTooltipMejores() {
    if (!this.btnInfoMejores?.nativeElement) {
      return;
    }

    const tooltipMejor = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoMejores.nativeElement
    );

    tooltipMejor.show();

    setTimeout(() => {
      try {
        tooltipMejor.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipGestion() {
    if (!this.btnInfoGestion?.nativeElement) {
      return;
    }

    const tooltipGestion = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoGestion.nativeElement
    );

    tooltipGestion.show();

    setTimeout(() => {
      try {
        tooltipGestion.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  onInicioTab() {
    this.active = "inicio";
    return;
  }

  onGraficoTab() {
    this.active = "graficos"
  }

  onVentasTab() {
    this.active = "ventas";
    return;
  }

  onRecomendacionTab() {
    this.active = "recomendaciones"
  }

  onPrediccionTab() {
    this.active = "predicciones"
  }

  onGestionTab() {
    this.active = "gestion";
  }

  onMejoresTab() {
    this.active = "mejores";
  }

  obtenerClaseColor(valor: number): string {
    if (valor < 0) {
      return 'estado-rojo';
    }

    if (valor <= 100) {
      return 'estado-amarillo';
    }

    return 'estado-verde';
  }

  ngOnInit(): void {
    this.cargarCantidadVentas();
    this.cargarCantidadAlergias();
    this.cargarCantidadCategorias();
    this.cargarCantidadIngredientes();
    this.cargarCantidadOfertas();
    this.cargarCantidadPlatos();
    this.cargarCantidadUsuarios();
    this.cargarCantidadZonas();
    this.cargarCantidadMetodoPago();

    this.cargarVentasHoy();
    this.cargarVentasSemana();
    this.cargarVentasMes();

    this.cargarCategoriaPlatos();
    this.cargarTop3VentasDesc();
    this.cargarPlatosPorVentas();
    this.cargarOfertasPorVentas();
    this.cargarVentasPorZona();
    this.cargarUsuariosFrecuentes();

    this.cargarMejorUsuario();
    this.cargarMejorPlato();
    this.cargarMejorOferta();
    this.cargarMejorZona();

    this.cargarOfertasCantidadPlatos();
    this.cargarAlergiaCantidadIngredientes();
    this.cargarCategoriaCantidadIngredientes();
    this.cargarFranjaMayor();
    this.cargarCategoriaMayor();
    this.cargarPlatoCrecimientoMayor();

    this.cargarVentasMañana();
    this.cargarTotalVentasMañana();
    this.cargarPlatosVentasManana();
    this.cargarPlatosRecomendacion();
    this.cargarTendenciaVenta();
    this.cargarRecomendacionOfertas();
  }

  cargarCantidadVentas(): void {
    this.consultaServicio.obtenerCantidadVentas().subscribe(dato => {
      this.cantidadVentas = dato.cantidad;
      this.cd.detectChanges();
    })
  }

  cargarCantidadUsuarios(): void {
    this.consultaServicio.obtenerCantidadUsuarios().subscribe(dato => {
      this.cantidadUsuarios = dato.cantidad;
      this.cd.detectChanges();
    })
  }

  cargarCantidadCategorias(): void {
    this.consultaServicio.obtenerCantidadCategorias().subscribe(dato => {
      this.cantidadCategorias = dato.cantidad;
      this.cd.detectChanges();
    })
  }

  cargarCantidadPlatos(): void {
    this.consultaServicio.obtenerCantidadPlatos().subscribe(dato => {
      this.cantidadPlatos = dato.cantidad;
      this.cd.detectChanges();
    })
  }

  cargarCantidadAlergias(): void {
    this.consultaServicio.obtenerCantidadAlergias().subscribe(dato => {
      this.cantidadAlergias = dato.cantidad;
      this.cd.detectChanges();
    })
  }

  cargarCantidadZonas(): void {
    this.consultaServicio.obtenerCantidadZonas().subscribe(dato => {
      this.cantidadZonas = dato.cantidad;
      this.cd.detectChanges();
    })
  }

  cargarCantidadIngredientes(): void {
    this.consultaServicio.obtenerCantidadIngredientes().subscribe(dato => {
      this.cantidadIngredientes = dato.cantidad;
      this.cd.detectChanges();
    })
  }

  cargarCantidadOfertas(): void {
    this.consultaServicio.obtenerCantidadOfertas().subscribe(dato => {
      this.cantidadOfertas = dato.cantidad;
      this.cd.detectChanges();
    })
  }

  cargarCantidadMetodoPago(): void {
    this.consultaServicio.obtenerCantidadMetodoPago().subscribe(datos => {
      this.metodoPagoChart = datos;
      if (this.metodoPagoChart.length > 0) {
        this.cd.detectChanges();
        new Chart('metodoPagoChart', {
          type: 'bar',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de métodos de pagos',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Métodos de Pagos más utilizados'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarCategoriaPlatos(): void {
    this.consultaServicio.obtenerCategoriaPlatos().subscribe(datos => {
      this.categoriaPlatosChart = datos;

      if (this.categoriaPlatosChart.length > 0) {
        this.cd.detectChanges();
        new Chart('categoriaPlatosChart', {
          type: 'pie',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Platos',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Platos por Categorías'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarVentasPorZona(): void {
    this.consultaServicio.obtenerVentasPorZona().subscribe(datos => {
      this.ventaZonaChart = datos;
      if (this.ventaZonaChart.length > 0) {
        this.cd.detectChanges();
        new Chart('ventaZonaChart', {
          type: 'pie',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Ventas por Zona',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Ventas por Zona'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarUsuariosFrecuentes(): void {
    this.consultaServicio.obtenerUsuariosMasFrecuentes().subscribe(datos => {
      this.usuariosFrecuentesChart = datos;
      if (this.usuariosFrecuentesChart.length > 0) {
        this.cd.detectChanges();
        new Chart('usuariosFrecuentesChart', {
          type: 'pie',
          data: {
            labels: datos.map(d => d.username),
            datasets: [{
              label: 'Ventas por Usuarios',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Ventas por Usuarios'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarVentasHoy() {
    this.consultaServicio.obtenerVentasHoy().subscribe(dato => {
      this.ventasHoy = dato.cantidad;
      this.totalVentasHoy = dato.suma;
      this.cd.detectChanges();
    })
  }

  cargarVentasSemana() {
    this.consultaServicio.obtenerVentasSemana().subscribe(dato => {
      this.ventasSemana = dato.cantidad;
      this.totalVentasSemana = dato.suma;
      this.cd.detectChanges();
    })
  }

  cargarVentasMes() {
    this.consultaServicio.obtenerVentasMes().subscribe(dato => {
      this.ventasMes = dato.cantidad;
      this.totalVentasMes = dato.suma;
      this.cd.detectChanges();
    })
  }

  cargarTop3VentasDesc() {
    this.consultaServicio.obtenerTop3VentasDesc().subscribe(datos => {
      this.ventas = datos;
      this.cd.detectChanges();
    })
  }

  cargarPlatosPorVentas() {
    this.consultaServicio.obtenerPlatosPorVentas().subscribe(datos => {
      this.platoVentasChart = datos;

      if (this.platoVentasChart.length > 0) {
        this.cd.detectChanges();
        new Chart('platosVentasChart', {
          type: 'pie',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Platos',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Platos por Ventas'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarOfertasPorVentas() {
    this.consultaServicio.obtenerOfertasPorVentas().subscribe(datos => {
      this.ofertaVentaChart = datos;

      if (this.ofertaVentaChart.length > 0) {
        this.cd.detectChanges()
        new Chart('ofertasVentasChart', {
          type: 'pie',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Ofertas',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Ofertas por Ventas'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarMejorUsuario() {
    this.consultaServicio.obtenerMejorUsuario().subscribe(dato => {
      this.usuarioUsername = dato.username;
      this.usuarioNombre = dato.nombre;
      this.usuarioApellido = dato.apellido;
      this.usuarioTelefono = dato.telefono;
      this.usuarioZona = dato.zona;
      this.usuarioCantidad = dato.cantidad;
      this.usuarioTotal = dato.total;
    })
  }

  cargarMejorPlato() {
    this.consultaServicio.obtenerMejorPlato().subscribe(dato => {
      this.platoNombre = dato.nombre;
      this.platoCategoria = dato.categoria;
      this.platoPrecio = dato.precio;
      this.platoImagen = dato.imagen;
      this.platoCantidad = dato.cantidad
      this.platoTotal = dato.total;
    })
  }

  cargarMejorOferta() {
    this.consultaServicio.obtenerMejorOferta().subscribe(dato => {
      this.ofertaNombre = dato.nombre;
      this.ofertaDescripcion = dato.descripcion;
      this.ofertaPrecioNuevo = dato.precio_nuevo;
      this.ofertaPlatos = dato.cantidad_productos;
      this.ofertaCantidad = dato.cantidad;
      this.ofertaTotal = dato.total;
      this.cd.detectChanges();
    })
  }

  cargarMejorZona() {
    this.consultaServicio.obtenerMejorZona().subscribe(dato => {
      this.zonaNombre = dato.nombre;
      this.zonaDepartamento = dato.departamento;
      this.zonaProvincia = dato.provincia;
      this.zonaCantidad = dato.cantidad;
      this.zonaTotal = dato.total;
      this.cd.detectChanges();
    })
  }

  cargarOfertasCantidadPlatos() {
    this.consultaServicio.obtenerOfertaCantidadPlatos().subscribe(datos => {
      this.ofertasCantidadPlatosChart = datos;
      if (this.ofertasCantidadPlatosChart.length > 0) {
        this.cd.detectChanges();
        new Chart('ofertasCantidadPlatosChart', {
          type: 'doughnut',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Platos',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Platos por Ofertas'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarAlergiaCantidadIngredientes() {
    this.consultaServicio.obtenerAlergiaCantidadIngredientes().subscribe(datos => {
      this.alergiaCantidadIngredientesChart = datos;
      if (this.alergiaCantidadIngredientesChart.length > 0) {
        this.cd.detectChanges();
        new Chart('alergiaCantidadIngredientesChart', {
          type: 'doughnut',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Ingredientes',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Ingredientes por Alergia'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarCategoriaCantidadIngredientes() {
    this.consultaServicio.obtenerCategoriaCantidadIngredientes().subscribe(datos => {
      this.categoriaCantidadIngredientesChart = datos;
      if (this.categoriaCantidadIngredientesChart.length > 0) {
        this.cd.detectChanges();
        new Chart('categoriaCantidadIngredientesChart', {
          type: 'doughnut',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Ingredientes',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Ingredientes por Categoria'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
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

  /*#####################################################################################################################################################
  ##                                                                MACHINE LEARNING                                                                    #
  #####################################################################################################################################################*/

  cargarVentasMañana() {
    this.consultaMlServicio.obtenerPrediccion().subscribe(dato => {
      this.ventasManana = dato.ventasManana;
      this.cd.detectChanges();
    })
  }

  cargarTotalVentasMañana() {
    this.consultaMlServicio.obtenerTotalVentaManana().subscribe(dato => {
      this.totalVentasManana = dato.ventasManana;
    })
  }

  cargarPlatosVentasManana() {
    this.consultaMlServicio.obtenerTotalPlatosVentas().subscribe(dato => {
      this.platosVentasManana = dato.ventasPlatos;
    })
  }

  cargarPlatosRecomendacion(): void {
    this.consultaMlServicio.obtenerCantidadPlatosRecomendacion().subscribe(dato => {
      this.recomendaciones = dato;

      this.platosRecomendacion = this.recomendaciones.map(({ tipo, titulo, mensaje }) => ({
        tipo,
        titulo,
        mensaje
      })).filter(c => c.tipo === 'Plato')

      this.clientesVip = this.recomendaciones.map(({ tipo, titulo, mensaje }) => ({
        tipo,
        titulo,
        mensaje
      })).filter(c => c.tipo === 'Cliente VIP')

      this.clientesFrecuentes = this.recomendaciones.map(({ tipo, titulo, mensaje }) => ({
        tipo,
        titulo,
        mensaje
      })).filter(c => c.tipo === 'Cliente Frecuente')

      this.clientesOcasionales = this.recomendaciones.map(({ tipo, titulo, mensaje }) => ({
        tipo,
        titulo,
        mensaje
      })).filter(c => c.tipo === 'Cliente Ocasional')

      this.ofertasRecomendacion = this.recomendaciones.map(({ tipo, titulo, mensaje }) => ({
        tipo,
        titulo,
        mensaje
      })).filter(c => c.tipo === 'Promoción')
    })
  }

  cargarTendenciaVenta(): void {
    this.consultaMlServicio.obtenerHistoricoVentas().subscribe(datos => {
      this.tendencia = datos;
      if (this.tendencia) {
        this.cd.detectChanges();
        this.grafico(datos);
        this.cd.detectChanges();
      }
    })
  }

  grafico(datos: TendenciaVentas): void {
    this.cd.detectChanges();
    const labels = datos.historico.map(x => x.fecha);
    const ventas = datos.historico.map(x => x.cantidad);

    labels.push("Mañana");
    ventas.push(datos.prediccionManana);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("tendenciaVentas", {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Ventas",
            data: ventas,
            tension: 0.3
          }
        ]
      },

      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
    this.cd.detectChanges();
  }

  cargarRecomendacionOfertas() {
    this.consultaMlServicio.obtenerRecomendacionOfertas().subscribe(datos => {
      this.recomendacionesOfertas = datos;
      this.cd.detectChanges();
    })
  }
}