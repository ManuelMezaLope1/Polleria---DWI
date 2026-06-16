import { ChangeDetectorRef, Component } from '@angular/core';
import { Oferta } from '../../../componentes/oferta/Oferta';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaServicio } from '../../../servicios/oferta/oferta-servicio';
import { catchError, Observable, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Plato } from '../../../componentes/plato/Plato';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { Categoria } from '../../../componentes/categoria/Categoria';
import { CategoriaServicio } from '../../../servicios/categoria/categoria-servicio';
import { Venta } from '../../../componentes/venta/Venta';
import { Zona } from '../../../componentes/zona/Zona';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { DetalleVenta } from '../../../componentes/venta/DetalleVenta';
import { MetodoPago } from '../../../componentes/metodopago/MetodoPago';
import { MetodopagoServicio } from '../../../servicios/metodopago/metodopago-servicio';
import { VentaServicio } from '../../../servicios/venta/venta-servicio';
import { DetalleVentaServicio } from '../../../servicios/detalleventa/detalle-venta-servicio';
import Swal from 'sweetalert2';
import { DetalleVentaPlatosServicio } from '../../../servicios/detalleventaplatos/detalle-venta-platos-servicio';
import { DetalleVentaOfertasServicio } from '../../../servicios/detalleventaofertas/detalle-venta-ofertas-servicio';
import { PedidoServicio } from '../../../servicios/pedido/pedido-servicio';
import { Pedido } from '../../../componentes/pedido/Pedido';

@Component({
  selector: 'app-carro',
  imports: [FormsModule, CommonModule],
  templateUrl: './carro.html',
  styleUrl: './carro.css',
})
export class Carro {
  id: number;
  oferta: Oferta = new Oferta();
  plato: Plato = new Plato();
  venta: Venta = new Venta();
  detalleVenta: DetalleVenta = new DetalleVenta();
  pedido: Pedido = new Pedido();

  platos: Plato[] = [];
  platos$!: Observable<Plato[]>;

  categorias: Categoria[] = [];
  categorias$!: Observable<Categoria[]>;

  metodopagos: MetodoPago[] = [];
  metodopagos$!: Observable<MetodoPago[]>;

  platoSeleccionado: any = null;
  bebidaSeleccionada: any = null;
  broasterSeleccionado: any = null;
  cremaSeleccionada: any = null;
  ensaladaSeleccionada: any = null;
  guarnicionSeleccionada: any = null;
  hamburguesaSeleccionada: any = null;
  parrillaSeleccionada: any = null;
  postreSeleccionado: any = null;

  totPla: number = 0;
  descPla: string = '';
  cantPla: number = 0;
  idPla: number = 0;
  cantOferta: number = 0;

  preDis: number = 0;
  preProd: number = 0;
  preBro: number = 0;
  preCre: number = 0;
  preEns: number = 0;
  preGua: number = 0;
  preHam: number = 0;
  prePar: number = 0;
  prePos: number = 0;

  decisionObservacion: any;
  observacionEscrita: any;
  pedidoObservacion: string = '';

  constructor(private ofertaServicio: OfertaServicio, private platoServicio: PlatoServicio, private categoriaServicio: CategoriaServicio, private router: Router,
    private route: ActivatedRoute, private cd: ChangeDetectorRef, private usuarioServicio: UsuarioServicio, private metodoPagoServicio: MetodopagoServicio,
    private ventaServicio: VentaServicio, private detalleVentaServicio: DetalleVentaServicio, private detalleVentaPlatoServicio: DetalleVentaPlatosServicio,
    private detalleVentaOfertaServicio: DetalleVentaOfertasServicio, private pedidoServicio: PedidoServicio) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    const tipo = this.route.snapshot.params['tipo'];
    this.decisionObservacion = 'No';

    if (tipo === "oferta") {
      this.ofertaServicio.obtenerOfertaPorId(this.id).pipe(
        tap(dato => {
          this.oferta = dato;
          this.detalleVenta.total = Number(this.oferta.precio_nuevo);
          this.totPla = Number(this.oferta.precio_nuevo);

          this.detalleVenta.descripcion = this.oferta.nombre;
          this.descPla = this.oferta.nombre;
          this.idPla = this.oferta.id;
          this.cantOferta = 1;

          this.detalleVenta.cantidad = Number(this.oferta.cantidad);
          this.cantPla = Number(this.oferta.cantidad);
          this.cd.detectChanges();
        }),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      ).subscribe();
    } else if (tipo === "plato") {
      this.platoServicio.obtenerPlatoPorId(this.id).pipe(
        tap(dato => {
          this.plato = dato;
          this.detalleVenta.total = Number(this.plato.precio);
          this.totPla = Number(this.plato.precio);

          this.detalleVenta.descripcion = this.plato.nombre;
          this.descPla = this.plato.nombre;
          this.idPla = 3;
          this.cantOferta = 0;

          this.detalleVenta.cantidad = 1;
          this.cantPla = 1;
          this.cd.detectChanges();
        }),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      ).subscribe()
    }


    this.platos$ = this.platoServicio.obtenerListaDePlatos();
    this.categorias$ = this.categoriaServicio.obtenerListaDeCategorias();
    this.metodopagos$ = this.metodoPagoServicio.obtenerListaDeMetodoPago();

    this.usuarioServicio.obtenerPerfil().pipe(
      tap(dato => {
        this.usuario = dato;
        this.venta.usuario = {
          id: this.usuario.id
        };
        this.venta.nombre = this.usuario.nombre;
        this.venta.username = this.usuario.username;
        this.venta.zona = this.usuario.zona;
        this.venta.fecha = new Date().toLocaleString();

        this.pedido.usuario = {
          id: this.usuario.id
        }
        this.pedido.username = this.usuario.username;

        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }

  decisionObservacionSi() {
    this.decisionObservacion = 'Si';
  }

  decisionObservacionNo() {
    this.decisionObservacion = 'No';
  }



  limpiarSeleccion() {
    this.bebidaSeleccionada = null;
    this.platoSeleccionado = null;
    this.broasterSeleccionado = null;
    this.cremaSeleccionada = null;
    this.ensaladaSeleccionada = null;
    this.guarnicionSeleccionada = null;
    this.hamburguesaSeleccionada = null;
    this.parrillaSeleccionada = null;
    this.postreSeleccionado = null;
  }

  //#####################################################################################################################################################
  //#                                                              CANTIDAD PARA VENTA                                                                  #
  //#####################################################################################################################################################
  cantBra = 0;
  cantBeb = 0;
  cantBro = 0;
  cantCre = 0;
  cantEns = 0;
  cantGua = 0;
  cantHam = 0;
  cantPar = 0;
  cantPos = 0;

  actualizarCantidad() {
    const platoExistente = this.platosAgregados.find(
      p => p.nombre === this.platoSeleccionado.nombre
    );

    const bebidaExistente = this.bebidasAgregadas.find(
      p => p.nombre === this.bebidaSeleccionada.nombre
    );

    const broasterExistente = this.broastersAgregados.find(
      p => p.nombre === this.broasterSeleccionado.nombre
    );

    const cremaExistente = this.cremaAgregada.find(
      p => p.nombre === this.cremaSeleccionada.nombre
    );

    const ensaladaExistente = this.ensaladaAgregada.find(
      p => p.nombre === this.ensaladaSeleccionada.nombre
    );

    const guarnicionExistente = this.guarnicionAgregada.find(
      p => p.nombre === this.guarnicionSeleccionada.nombre
    );

    const hamburguesaExistente = this.hamburguesaAgregada.find(
      p => p.nombre === this.hamburguesaSeleccionada.nombre
    );

    const parrillaExistente = this.parrillaAgregada.find(
      p => p.nombre === this.parrillaSeleccionada.nombre
    );

    const postreExistente = this.postreAgregado.find(
      p => p.nombre === this.postreSeleccionado.nombre
    );

    if (platoExistente) {
      this.cantBra = this.platosAgregados.reduce((cantidad, p) => (p.cantidad), 0);
    }

    if (bebidaExistente) {
      this.cantBeb = this.bebidasAgregadas.reduce((cantidad, p) => (p.cantidad), 0);
    }

    if (broasterExistente) {
      this.cantBro = this.broastersAgregados.reduce((cantidad, p) => (p.cantidad), 0);
    }

    if (cremaExistente) {
      this.cantCre = this.cremaAgregada.reduce((cantidad, p) => (p.cantidad), 0);
    }

    if (ensaladaExistente) {
      this.cantEns = this.ensaladaAgregada.reduce((cantidad, p) => (p.cantidad), 0);
    }

    if (guarnicionExistente) {
      this.cantGua = this.guarnicionAgregada.reduce((cantidad, p) => (p.cantidad), 0);
    }

    if (hamburguesaExistente) {
      this.cantHam = this.hamburguesaAgregada.reduce((cantidad, p) => (p.cantidad), 0);
    }

    if (parrillaExistente) {
      this.cantPar = this.parrillaAgregada.reduce((cantidad, p) => (p.cantidad), 0);
    }

    if (postreExistente) {
      this.cantPos = this.postreAgregado.reduce((cantidad, p) => (p.cantidad), 0);
    }

    this.detalleVenta.cantidad = this.cantPla + this.cantBra + this.cantBeb + this.cantBro + this.cantCre + this.cantEns + this.cantGua + this.cantHam + this.cantPar + this.cantPos
  }

  //#####################################################################################################################################################
  //#                                                                TOTAL PARA VENTA                                                                   #
  //#####################################################################################################################################################
  totalPlatos = 0;
  totalBebidas = 0;
  totalBroasters = 0;
  totalCrema = 0;
  totalEnsalada = 0;
  totalGuarnicion = 0;
  totalHamburguesa = 0;
  totalParrilla = 0;
  totalPostre = 0;

  actualizarTotal() {
    const platoExistente = this.platosAgregados.find(
      p => p.nombre === this.platoSeleccionado.nombre
    );

    const bebidaExistente = this.bebidasAgregadas.find(
      p => p.nombre === this.bebidaSeleccionada.nombre
    );

    const broasterExistente = this.broastersAgregados.find(
      p => p.nombre === this.broasterSeleccionado.nombre
    );

    const cremaExistente = this.cremaAgregada.find(
      p => p.nombre === this.cremaSeleccionada.nombre
    );

    const ensaladaExistente = this.ensaladaAgregada.find(
      p => p.nombre === this.ensaladaSeleccionada.nombre
    );

    const guarnicionExistente = this.guarnicionAgregada.find(
      p => p.nombre === this.guarnicionSeleccionada.nombre
    );

    const hamburguesaExistente = this.hamburguesaAgregada.find(
      p => p.nombre === this.hamburguesaSeleccionada.nombre
    );

    const parrillaExistente = this.parrillaAgregada.find(
      p => p.nombre === this.parrillaSeleccionada.nombre
    );

    const postreExistente = this.postreAgregado.find(
      p => p.nombre === this.postreSeleccionado.nombre
    );

    if (platoExistente) {
      this.totalPlatos = this.platosAgregados.reduce((total, p) => total + (p.precio), 0);
    }

    if (bebidaExistente) {
      this.totalBebidas = this.bebidasAgregadas.reduce((total, p) => total + (p.precio), 0);
    }

    if (broasterExistente) {
      this.totalBroasters = this.broastersAgregados.reduce((total, p) => total + (p.precio), 0);
    }

    if (cremaExistente) {
      this.totalCrema = this.cremaAgregada.reduce((total, p) => total + (p.precio), 0);
    }

    if (ensaladaExistente) {
      this.totalEnsalada = this.ensaladaAgregada.reduce((total, p) => total + (p.precio), 0);
    }

    if (guarnicionExistente) {
      this.totalGuarnicion = this.guarnicionAgregada.reduce((total, p) => total + (p.precio), 0);
    }

    if (hamburguesaExistente) {
      this.totalHamburguesa = this.hamburguesaAgregada.reduce((total, p) => total + (p.precio), 0);
    }

    if (parrillaExistente) {
      this.totalParrilla = this.parrillaAgregada.reduce((total, p) => total + (p.precio), 0);
    }

    if (postreExistente) {
      this.totalPostre = this.postreAgregado.reduce((total, p) => total + (p.precio), 0);
    }

    this.detalleVenta.total = this.totPla + this.totalPlatos + this.totalBebidas + this.totalBroasters + this.totalCrema + this.totalEnsalada + this.totalGuarnicion + this.totalHamburguesa + this.totalParrilla + this.totalPostre;
    this.detalleVenta.total = Number(this.detalleVenta.total.toFixed(2));
  }

  //#####################################################################################################################################################
  //#                                                            DESCRIPCIÓN PARA VENTA                                                                 #
  //#####################################################################################################################################################

  nombrePlato = '';
  nombreBebida = '';
  nombreBroaster = '';
  nombreCrema = '';
  nombreEnsalada = '';
  nombreGuarnicion = '';
  nombreHamburguesa = '';
  nombreParrilla = '';
  nombrePostre = '';
  descripcion = '';

  actualizarDescripcion() {
    const platoExistente = this.platosAgregados.find(
      p => p.nombre === this.platoSeleccionado.nombre
    );

    const bebidaExistente = this.bebidasAgregadas.find(
      p => p.nombre === this.bebidaSeleccionada.nombre
    );

    const broasterExistente = this.broastersAgregados.find(
      p => p.nombre === this.broasterSeleccionado.nombre
    );

    const cremaExistente = this.cremaAgregada.find(
      p => p.nombre === this.cremaSeleccionada.nombre
    );

    const ensaladaExistente = this.ensaladaAgregada.find(
      p => p.nombre === this.ensaladaSeleccionada.nombre
    );

    const guarnicionExistente = this.guarnicionAgregada.find(
      p => p.nombre === this.guarnicionSeleccionada.nombre
    );

    const hamburguesaExistente = this.hamburguesaAgregada.find(
      p => p.nombre === this.hamburguesaSeleccionada.nombre
    );

    const parrillaExistente = this.parrillaAgregada.find(
      p => p.nombre === this.parrillaSeleccionada.nombre
    );

    const postreExistente = this.postreAgregado.find(
      p => p.nombre === this.postreSeleccionado.nombre
    );

    if (platoExistente) {
      this.nombrePlato = this.platosAgregados.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    }

    if (bebidaExistente) {
      this.nombreBebida = this.bebidasAgregadas.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    }

    if (broasterExistente) {
      this.nombreBroaster = this.broastersAgregados.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    }

    if (cremaExistente) {
      this.nombreCrema = this.cremaAgregada.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    }

    if (ensaladaExistente) {
      this.nombreEnsalada = this.ensaladaAgregada.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    }

    if (guarnicionExistente) {
      this.nombreGuarnicion = this.guarnicionAgregada.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    }

    if (hamburguesaExistente) {
      this.nombreHamburguesa = this.hamburguesaAgregada.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    }

    if (parrillaExistente) {
      this.nombreParrilla = this.parrillaAgregada.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    }

    if (postreExistente) {
      this.nombrePostre = this.postreAgregado.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    }

    this.descripcion = this.descPla + ' + ' + this.nombrePlato + ' + ' + this.nombreBroaster + ' + ' + this.nombreEnsalada + ' + ' + this.nombreHamburguesa + ' + ' + this.nombreParrilla + ' + ' + this.nombrePostre + ' + ' + this.nombreGuarnicion + ' + ' + this.nombreBebida + ' + ' + this.nombreCrema;
    this.detalleVenta.descripcion = this.descripcion.split('+').map(x => x.trim()).filter(x => x !== '').join(' + ');
  }

  //#####################################################################################################################################################
  //#                                                                    AGREGAR                                                                        #
  //#####################################################################################################################################################

  platosAgregados: any[] = [];
  bebidasAgregadas: any[] = [];
  broastersAgregados: any[] = [];
  cremaAgregada: any[] = [];
  ensaladaAgregada: any[] = [];
  guarnicionAgregada: any[] = [];
  hamburguesaAgregada: any[] = [];
  parrillaAgregada: any[] = [];
  postreAgregado: any[] = [];

  agregarInput() {
    if (!this.platoSeleccionado) return;

    const platoExistente = this.platosAgregados.find(
      p => p.nombre === this.platoSeleccionado.nombre
    );

    if (platoExistente) {
      platoExistente.cantidad += 1;

      platoExistente.precio = platoExistente.cantidad * this.platoSeleccionado.precio;
    } else {
      this.platosAgregados.push({
        nombre: this.platoSeleccionado.nombre,
        precio: this.platoSeleccionado.precio,
        cantidad: 1,
        descripcion: this.platoSeleccionado.descripcion
      });
      this.preProd = this.platoSeleccionado.precio;
    }

    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  agregarBebida() {
    if (!this.bebidaSeleccionada) return;

    const bebidaExistente = this.bebidasAgregadas.find(
      p => p.id === this.bebidaSeleccionada.id
    );

    if (bebidaExistente) {
      bebidaExistente.cantidad += 1;

      bebidaExistente.precio = bebidaExistente.cantidad * this.bebidaSeleccionada.precio;
    } else {
      this.bebidasAgregadas.push({
        id: this.bebidaSeleccionada.id,
        nombre: this.bebidaSeleccionada.nombre,
        precio: this.bebidaSeleccionada.precio,
        cantidad: 1,
        descripcion: this.bebidaSeleccionada.descripcion
      });

      this.preDis = this.bebidaSeleccionada.precio;
    }

    this.bebidasAgregadas = [...this.bebidasAgregadas];

    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  agregarBroaster() {
    if (!this.broasterSeleccionado) return;

    const broasterExistente = this.broastersAgregados.find(
      p => p.id === this.broasterSeleccionado.id
    );

    if (broasterExistente) {
      broasterExistente.cantidad += 1;

      broasterExistente.precio = broasterExistente.cantidad * this.broasterSeleccionado.precio;
    } else {
      this.broastersAgregados.push({
        id: this.broasterSeleccionado.id,
        nombre: this.broasterSeleccionado.nombre,
        precio: this.broasterSeleccionado.precio,
        cantidad: 1,
        descripcion: this.broasterSeleccionado.descripcion
      });

      this.preBro = this.broasterSeleccionado.precio;
    }

    this.broastersAgregados = [...this.broastersAgregados];

    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  agregarCrema() {
    if (!this.cremaSeleccionada) return;

    const cremaExistente = this.cremaAgregada.find(
      p => p.id === this.cremaSeleccionada.id
    );

    if (cremaExistente) {
      cremaExistente.cantidad += 1;

      cremaExistente.precio = cremaExistente.cantidad * this.cremaSeleccionada.precio;
    } else {
      this.cremaAgregada.push({
        id: this.cremaSeleccionada.id,
        nombre: this.cremaSeleccionada.nombre,
        precio: this.cremaSeleccionada.precio,
        cantidad: 1,
        descripcion: this.cremaSeleccionada.descripcion
      });

      this.preCre = this.cremaSeleccionada.precio;
    }

    this.cremaAgregada = [...this.cremaAgregada];

    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  agregarEnsalada() {
    if (!this.ensaladaSeleccionada) return;

    const ensaladaExistente = this.ensaladaAgregada.find(
      p => p.id === this.ensaladaSeleccionada.id
    );

    if (ensaladaExistente) {
      ensaladaExistente.cantidad += 1;

      ensaladaExistente.precio = ensaladaExistente.cantidad * this.ensaladaSeleccionada.precio;
    } else {
      this.ensaladaAgregada.push({
        id: this.ensaladaSeleccionada.id,
        nombre: this.ensaladaSeleccionada.nombre,
        precio: this.ensaladaSeleccionada.precio,
        cantidad: 1,
        descripcion: this.ensaladaSeleccionada.descripcion
      });

      this.preEns = this.ensaladaSeleccionada.precio;
    }

    this.ensaladaAgregada = [...this.ensaladaAgregada];

    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  agregarGuarnicion() {
    if (!this.guarnicionSeleccionada) return;

    const guarnicionExistente = this.guarnicionAgregada.find(
      p => p.id === this.guarnicionSeleccionada.id
    );

    if (guarnicionExistente) {
      guarnicionExistente.cantidad += 1;

      guarnicionExistente.precio = guarnicionExistente.cantidad * this.guarnicionSeleccionada.precio;
    } else {
      this.guarnicionAgregada.push({
        id: this.guarnicionSeleccionada.id,
        nombre: this.guarnicionSeleccionada.nombre,
        precio: this.guarnicionSeleccionada.precio,
        cantidad: 1,
        descripcion: this.guarnicionSeleccionada.descripcion
      });

      this.preGua = this.guarnicionSeleccionada.precio;
    }

    this.guarnicionAgregada = [...this.guarnicionAgregada];

    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  agregarHamburguesa() {
    if (!this.hamburguesaSeleccionada) return;

    const hamburguesaExistente = this.hamburguesaAgregada.find(
      p => p.id === this.hamburguesaSeleccionada.id
    );

    if (hamburguesaExistente) {
      hamburguesaExistente.cantidad += 1;

      hamburguesaExistente.precio = hamburguesaExistente.cantidad * this.hamburguesaSeleccionada.precio;
    } else {
      this.hamburguesaAgregada.push({
        id: this.hamburguesaSeleccionada.id,
        nombre: this.hamburguesaSeleccionada.nombre,
        precio: this.hamburguesaSeleccionada.precio,
        cantidad: 1,
        descripcion: this.hamburguesaSeleccionada.descripcion
      });

      this.preHam = this.hamburguesaSeleccionada.precio;
    }

    this.hamburguesaAgregada = [...this.hamburguesaAgregada];

    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  agregarParrilla() {
    if (!this.parrillaSeleccionada) return;

    const parrillaExistente = this.parrillaAgregada.find(
      p => p.id === this.parrillaSeleccionada.id
    );

    if (parrillaExistente) {
      parrillaExistente.cantidad += 1;

      parrillaExistente.precio = parrillaExistente.cantidad * this.parrillaSeleccionada.precio;
    } else {
      this.parrillaAgregada.push({
        id: this.parrillaSeleccionada.id,
        nombre: this.parrillaSeleccionada.nombre,
        precio: this.parrillaSeleccionada.precio,
        cantidad: 1,
        descripcion: this.parrillaSeleccionada.descripcion
      });

      this.prePar = this.parrillaSeleccionada.precio;
    }

    this.parrillaAgregada = [...this.parrillaAgregada];

    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  agregarPostre() {
    if (!this.postreSeleccionado) return;

    const postreExistente = this.postreAgregado.find(
      p => p.id === this.postreSeleccionado.id
    );

    if (postreExistente) {
      postreExistente.cantidad += 1;

      postreExistente.precio = postreExistente.cantidad * this.postreSeleccionado.precio;
    } else {
      this.postreAgregado.push({
        id: this.postreSeleccionado.id,
        nombre: this.postreSeleccionado.nombre,
        precio: this.postreSeleccionado.precio,
        cantidad: 1,
        descripcion: this.postreSeleccionado.descripcion
      });

      this.prePos = this.postreSeleccionado.precio;
    }

    this.postreAgregado = [...this.postreAgregado];

    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  //#####################################################################################################################################################
  //#                                                                    RESTAR                                                                         #
  //#####################################################################################################################################################

  restarProducto(index: number) {
    this.platosAgregados[index].cantidad--;

    this.platosAgregados[index].precio = this.platosAgregados[index].cantidad * this.preProd;

    if (this.platosAgregados[index].cantidad <= 0) {
      this.platosAgregados = [...this.platosAgregados];
      this.actualizarCantidad();
      this.actualizarTotal();
      this.nombrePlato = '';
      this.platosAgregados.splice(index, 1);
    }

    this.platosAgregados = [...this.platosAgregados];
    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  restarBebida(index: number) {
    this.bebidasAgregadas[index].cantidad--;
    this.bebidasAgregadas[index].precio = this.bebidasAgregadas[index].cantidad * this.preDis;

    if (this.bebidasAgregadas[index].cantidad <= 0) {
      this.bebidasAgregadas = [...this.bebidasAgregadas];
      this.actualizarCantidad();
      this.actualizarTotal();
      this.nombreBebida = '';
      this.bebidasAgregadas.splice(index, 1);
    }

    this.bebidasAgregadas = [...this.bebidasAgregadas];
    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  restarBroaster(index: number) {
    this.broastersAgregados[index].cantidad--;
    this.broastersAgregados[index].precio = this.broastersAgregados[index].cantidad * this.preBro;

    if (this.broastersAgregados[index].cantidad <= 0) {
      this.broastersAgregados = [...this.broastersAgregados];
      this.actualizarCantidad();
      this.actualizarTotal();
      this.nombreBroaster = '';
      this.broastersAgregados.splice(index, 1);
    }

    this.broastersAgregados = [...this.broastersAgregados];
    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  restarCrema(index: number) {
    this.cremaAgregada[index].cantidad--;
    this.cremaAgregada[index].precio = this.cremaAgregada[index].cantidad * this.preCre;

    if (this.cremaAgregada[index].cantidad <= 0) {
      this.cremaAgregada = [...this.cremaAgregada];
      this.actualizarCantidad();
      this.actualizarTotal();
      this.nombreCrema = '';
      this.cremaAgregada.splice(index, 1);
    }

    this.cremaAgregada = [...this.cremaAgregada];
    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  restarEnsalada(index: number) {
    this.ensaladaAgregada[index].cantidad--;
    this.ensaladaAgregada[index].precio = this.ensaladaAgregada[index].cantidad * this.preEns;

    if (this.ensaladaAgregada[index].cantidad <= 0) {
      this.ensaladaAgregada = [...this.ensaladaAgregada];
      this.actualizarCantidad();
      this.actualizarTotal();
      this.nombreEnsalada = '';
      this.ensaladaAgregada.splice(index, 1);
    }

    this.ensaladaAgregada = [...this.ensaladaAgregada];
    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  restarGuarnicion(index: number) {
    this.guarnicionAgregada[index].cantidad--;
    this.guarnicionAgregada[index].precio = this.guarnicionAgregada[index].cantidad * this.preGua;

    if (this.guarnicionAgregada[index].cantidad <= 0) {
      this.guarnicionAgregada = [...this.guarnicionAgregada];
      this.actualizarCantidad();
      this.actualizarTotal();
      this.nombreGuarnicion = '';
      this.guarnicionAgregada.splice(index, 1);
    }

    this.guarnicionAgregada = [...this.guarnicionAgregada];
    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  restarHamburguesa(index: number) {
    this.hamburguesaAgregada[index].cantidad--;
    this.hamburguesaAgregada[index].precio = this.hamburguesaAgregada[index].cantidad * this.preHam;

    if (this.hamburguesaAgregada[index].cantidad <= 0) {
      this.hamburguesaAgregada = [...this.hamburguesaAgregada];
      this.actualizarCantidad();
      this.actualizarTotal();
      this.nombreHamburguesa = '';
      this.hamburguesaAgregada.splice(index, 1);
    }

    this.hamburguesaAgregada = [...this.hamburguesaAgregada];
    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  restarParrilla(index: number) {
    this.parrillaAgregada[index].cantidad--;
    this.parrillaAgregada[index].precio = this.parrillaAgregada[index].cantidad * this.prePar;

    if (this.parrillaAgregada[index].cantidad <= 0) {
      this.parrillaAgregada = [...this.parrillaAgregada];
      this.actualizarCantidad();
      this.actualizarTotal();
      this.nombreParrilla = '';
      this.parrillaAgregada.splice(index, 1);
    }

    this.parrillaAgregada = [...this.parrillaAgregada];
    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  restarPostre(index: number) {
    this.postreAgregado[index].cantidad--;
    this.postreAgregado[index].precio = this.postreAgregado[index].cantidad * this.prePos;

    if (this.postreAgregado[index].cantidad <= 0) {
      this.postreAgregado = [...this.postreAgregado];
      this.actualizarCantidad();
      this.actualizarTotal();
      this.nombrePostre = '';
      this.postreAgregado.splice(index, 1);
    }

    this.postreAgregado = [...this.postreAgregado];
    this.actualizarCantidad();
    this.actualizarTotal();
    this.actualizarDescripcion();
  }

  //#####################################################################################################################################################
  //#                                                                    PARA USUARIO                                                                   #
  //#####################################################################################################################################################
  usuario: any;
  username: string;
  zonas: Zona[] = [];

  metodoPagoSeleccionado: any;

  seleccionarItem(item: any): void {
    this.metodoPagoSeleccionado = item;
    this.venta.metodopago = this.metodoPagoSeleccionado;
  }

  //#####################################################################################################################################################
  //#                                                                  GUARDAR RELACIÓN                                                                 #
  //#####################################################################################################################################################

  detallesAgregados: any[] = [];
  ofertasAgredadas: any[] = [];
  detalleVentaRelacion: any;

  guardarRelaciones() {
    const lista: { id: number, cantidad: number }[] = [];

    const agregar = (arr?: any[]) => {
      arr?.filter(x => x.id != null)
        .forEach(x => {
          lista.push({
            id: x.id,
            cantidad: x.cantidad || 1
          });
        });
    };

    agregar(this.platosAgregados);
    agregar(this.bebidasAgregadas);
    agregar(this.cremaAgregada);
    agregar(this.broastersAgregados);
    agregar(this.ensaladaAgregada);
    agregar(this.guarnicionAgregada);
    agregar(this.hamburguesaAgregada);
    agregar(this.parrillaAgregada);
    agregar(this.postreAgregado);

    const relacionesPlatos = lista.map(item => ({
      detalleVentaId: this.detalleVentaRelacion,
      platoId: item.id,
      cantidad_platos: item.cantidad,
    }));

    this.ofertasAgredadas.push({
      detalleVentaId: this.detalleVentaRelacion,
      ofertaId: this.idPla,
      cantidad_oferta: this.cantOferta
    })

    this.detalleVentaPlatoServicio.guardarLote(relacionesPlatos).subscribe({
      next: () => console.log(''),
      error: err => console.error(err)
    });

    this.detalleVentaOfertaServicio.guardarLote(this.ofertasAgredadas).subscribe({
      next: () => console.log(''),
      error: err => console.error(err)
    })
  }

  onSubmit() {
    this.ventaServicio.registrarVenta(this.venta).pipe(
      tap((ventaGuardada: any) => {
        this.detalleVenta.venta = {
          id: ventaGuardada.id
        };

        this.pedido.venta = {
          id: ventaGuardada.id
        };

        this.confirmarCompra();
      })
    ).subscribe()
  }

  confirmarCompra() {
    Swal.fire({
      title: 'Venta registrada',
      text: 'La venta ha sido registrada con éxito',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mostrarPedido();
      }
    })
  }

  mostrarPedido() {
    if (this.decisionObservacion === 'Si') {
      this.pedidoObservacion = this.observacionEscrita;
    } else if (this.decisionObservacion === 'No') {
      this.pedidoObservacion = 'Sin observación';
    }

    this.pedido.observacion = this.pedidoObservacion;
    this.registrarPedido();
  }

  registrarPedido() {
    this.pedido.fecha_creacion = new Date().toLocaleString();
    this.pedido.estado_pedido = 'Pendiente';
    this.pedido.fecha_entrega=new Date().toLocaleString();

    this.pedidoServicio.registrarPedido(this.pedido).pipe(
      tap(dato => {
        console.log(this.pedido);
        this.registrarDetalleVenta();
      }),
      catchError(err=>{
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }

  registrarDetalleVenta() {
    this.detalleVentaServicio.registrarDetalleVenta(this.detalleVenta).pipe(
      tap((detalleVentaGuardada: any) => {
        this.detalleVentaRelacion = detalleVentaGuardada.id;
        this.detalleVenta.cantidad = Number(this.detalleVenta.cantidad);
        this.detalleVenta.total = Number(this.detalleVenta.total);

        this.guardarRelaciones();
        this.irAInicio();
      })
    ).subscribe()
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }
}