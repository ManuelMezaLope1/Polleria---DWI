import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsultaServicio } from '../../../servicios/consulta/consulta-servicio';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { ConsultaMlServicio } from '../../../servicios/consultaml/consulta-ml-servicio';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  active: string = "inicio";

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

  graficoUsuarioVentas!: Chart;

  ventasManana: number = 0;
  totalVentasManana: number = 0;
  platosVentasManana: number=0;

  constructor(private consultaServicio: ConsultaServicio, private consultaMlServicio: ConsultaMlServicio, private cd: ChangeDetectorRef) { }

  onInicioTab() {
    this.active = "inicio";
  }

  onGraficoTab() {
    this.active = "graficos"
  }

  onVentasTab() {
    this.active = "ventas";
  }

  onGestionTab() {
    this.active = "otros";
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

    this.cargarUsuarioVentas();
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

    this.cargarVentasMañana();
    this.cargarTotalVentasMañana();
    this.cargarPlatosVentasManana();
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
    })
  }

  cargarUsuarioVentas(): void {
    this.consultaServicio.obtenerUsuarioVentas().subscribe(datos => {
      new Chart('usuarioVentasChart', {
        type: 'bar',
        data: {
          labels: datos.map(d => d.username),
          datasets: [{
            label: 'Cantidad de ventas',
            data: datos.map(d => d.cantidad)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Ventas por Usuario'
            }
          }
        }
      });
      this.cd.detectChanges();
    })
  }

  cargarCategoriaPlatos(): void {
    this.consultaServicio.obtenerCategoriaPlatos().subscribe(datos => {
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
    })
  }

  cargarVentasPorZona(): void {
    this.consultaServicio.obtenerVentasPorZona().subscribe(datos => {
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
    })
  }

  cargarUsuariosFrecuentes(): void {
    this.consultaServicio.obtenerUsuariosMasFrecuentes().subscribe(datos => {
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
    })
  }

  cargarOfertasPorVentas() {
    this.consultaServicio.obtenerOfertasPorVentas().subscribe(datos => {
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
}