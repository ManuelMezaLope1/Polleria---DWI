import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plato } from '../../../componentes/plato/Plato';
import { catchError, filter, map, Observable, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { OfertaServicio } from '../../../servicios/oferta/oferta-servicio';
import { Oferta } from '../../../componentes/oferta/Oferta';
import { DetalleVenta } from '../../../componentes/venta/DetalleVenta';
import { Venta } from '../../../componentes/venta/Venta';
import { VentaServicio } from '../../../servicios/venta/venta-servicio';
import { DetalleVentaServicio } from '../../../servicios/detalleventa/detalle-venta-servicio';
import { PedidoServicio } from '../../../servicios/pedido/pedido-servicio';
import { Pedido } from '../../../componentes/pedido/Pedido';
import { DetalleVentaPlatosServicio } from '../../../servicios/detalleventaplatos/detalle-venta-platos-servicio';
import { DetalleVentaOfertasServicio } from '../../../servicios/detalleventaofertas/detalle-venta-ofertas-servicio';
import { MetodopagoServicio } from '../../../servicios/metodopago/metodopago-servicio';
import { ZonaServicio } from '../../../servicios/zona/zona-servicio';
import { MesaServicio } from '../../../servicios/mesa/mesa-servicio';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { IMesa } from '../../../componentes/pedido/IMesa';

@Component({
  selector: 'app-registro-pedido-mesa',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-pedido-mesa.html',
  styleUrl: './registro-pedido-mesa.css',
})
export class RegistroPedidoMesa {
  id: number;
  platoSeleccionado: any = null;
  platos: Plato[] = [];
  platos$!: Observable<Plato[]>;
  platoAgregado: any[] = [];
  nombrePlato = '';
  cantidadPlato: number = 0;
  totalPlato: number = 0;
  platosAgregadosFinal: any[] = [];

  ofertaSeleccionada: any = null;
  ofertas: Plato[] = [];
  ofertas$!: Observable<Oferta[]>;
  ofertaAgregada: any[] = [];
  nombreOferta = '';
  cantidadOferta: number = 0;
  totalOferta: number = 0;
  ofertasAgregadasFinal: any[] = [];
  mesa: IMesa=new IMesa();

  eleccion: any;
  descripcion = '';
  venta: Venta = new Venta();

  detalleVentaRelacion: any;
  detalleVenta: DetalleVenta = new DetalleVenta();

  pedido: Pedido = new Pedido();
  decisionObservacion: any;
  observacionEscrita: any;
  pedidoObservacion: string = '';

  constructor(private platoServicio: PlatoServicio, private ofertaServicio: OfertaServicio, private ventaServicio: VentaServicio, 
    private detalleVentaServicio: DetalleVentaServicio, private pedidoServicio: PedidoServicio, private detalleVentaPlatoServicio: DetalleVentaPlatosServicio, 
    private detalleVentaOfertaServicio: DetalleVentaOfertasServicio, private metodoPagoServicio: MetodopagoServicio, private zonaServicio: ZonaServicio, 
    private mesaServicio: MesaServicio, private usuarioServicio: UsuarioServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.decisionObservacion = 'No';
    this.platos$ = this.platoServicio.obtenerListaDePlatos().pipe(
      map(platos =>
        platos.sort((a, b) => a.nombre.localeCompare(b.nombre))
      )
    );

    this.ofertas$ = this.ofertaServicio.obtenerListaDeOfertas().pipe(
      map(ofertas =>
        ofertas.sort((a, b) => a.nombre.localeCompare(b.nombre)).filter(o => o.nombre !== 'Sin promoción')
      )
    );

    this.metodoPagoServicio.obtenerListaDeMetodoPago().subscribe(dato=>{
      this.venta.metodopago=dato.map(({id,nombre})=>({id,nombre})).find(mp=>mp.id===4)
      this.cd.detectChanges();
    })

    this.zonaServicio.obtenerListaDeZonas().subscribe(dato=>{
      this.venta.zona=dato.map(({id,nombre})=>({id,nombre})).find(z=>z.id===1);
      this.cd.detectChanges();
    });

    this.mesaServicio.obtenerMesaPorId(this.id).subscribe(dato=>{
      this.venta.mesa=dato;
      this.cd.detectChanges();
    });

    this.usuarioServicio.obtenerListaDePlatos().subscribe(dato=>{
      this.venta.usuario=dato.find(u=>u.id===18)
      this.cd.detectChanges();
    })
  }

  volver() {
    this.router.navigate(['/polleria']);
  }

  agregarPlato() {
    if (!this.platoSeleccionado) return;

    const platoExistente = this.platoAgregado.find(
      p => p.id === this.platoSeleccionado.id
    );

    if (platoExistente) {
      platoExistente.cantidad += 1;
      platoExistente.precio = platoExistente.cantidad * this.platoSeleccionado.precio;
    } else {
      this.platoAgregado.push({
        id: this.platoSeleccionado.id,
        nombre: this.platoSeleccionado.nombre,
        precio: this.platoSeleccionado.precio,
        descripcion: this.platoSeleccionado.descripcion,
        cantidad: 1,
        imagen: this.platoSeleccionado.imagen,
        categoria: this.platoSeleccionado.categoria
      })
    }
    this.platoAgregado = [...this.platoAgregado];
    this.actualizarDescripcion();
    this.actualizarCantidad();
    this.actualizarTotal();
  }

  quitarPlato(index: number) {
    this.platoAgregado.splice(index, 1);
    this.platoAgregado = [...this.platoAgregado];

    this.actualizarDescripcion();
    this.actualizarCantidad();
    this.actualizarTotal();
  }

  restarPlato(index: number) {
    const plato = this.platoAgregado[index];
    plato.cantidad--;

    if (plato.cantidad <= 0) {
      this.platoAgregado.splice(index, 1);
    } else {
      plato.precio = plato.cantidad * this.ofertaSeleccionada.precio;
    }

    this.ofertaAgregada = [...this.ofertaAgregada];

    this.actualizarDescripcion();
    this.actualizarCantidad();
    this.actualizarTotal();
  }

  agregarOferta() {
    const ofertaExistente = this.ofertaAgregada.find(
      p => p.id === this.ofertaSeleccionada.id
    );

    if (ofertaExistente) {
      ofertaExistente.cantidad += 1;
      ofertaExistente.precio = ofertaExistente.cantidad * this.ofertaSeleccionada.precio_nuevo;
    } else {
      this.ofertaAgregada.push({
        id: this.ofertaSeleccionada.id,
        nombre: this.ofertaSeleccionada.nombre,
        descripcion: this.ofertaSeleccionada.descripcion,
        platos: this.ofertaSeleccionada.cantidad,
        cantidad: 1,
        precio: this.ofertaSeleccionada.precio_nuevo,
      })
    }
    this.ofertaAgregada = [...this.ofertaAgregada];
    this.actualizarDescripcion();
    this.actualizarCantidad();
    this.actualizarTotal();
  }

  quitarOferta(index: number) {
    this.ofertaAgregada.splice(index, 1);
    this.ofertaAgregada = [...this.ofertaAgregada];

    this.actualizarDescripcion();
    this.actualizarCantidad();
    this.actualizarTotal();
  }

  restarOferta(index: number) {
    const oferta = this.ofertaAgregada[index];
    oferta.cantidad--;

    if (oferta.cantidad <= 0) {
      this.ofertaAgregada.splice(index, 1);
    } else {
      oferta.precio = oferta.cantidad * this.ofertaSeleccionada.precio_nuevo;
    }

    this.ofertaAgregada = [...this.ofertaAgregada];

    this.actualizarDescripcion();
    this.actualizarCantidad();
    this.actualizarTotal();
  }

  actualizarCantidad() {
    this.cantidadPlato = this.platoAgregado.reduce((total, p) => total + p.cantidad, 0);
    this.cantidadOferta = this.ofertaAgregada.reduce((total, p) => total + p.cantidad, 0);

    this.detalleVenta.cantidad = this.cantidadPlato + this.cantidadOferta;
  }

  actualizarTotal() {
    this.totalPlato = this.platoAgregado.reduce((total, p) => total + p.precio, 0);
    this.totalOferta = this.ofertaAgregada.reduce((total, p) => total + p.precio, 0);

    this.detalleVenta.total = Number((this.totalPlato + this.totalOferta).toFixed(2));
  }

  actualizarDescripcion() {
    this.nombrePlato = this.platoAgregado.map(p => `${p.nombre} x${p.cantidad}`).join(', ');
    this.nombreOferta = this.ofertaAgregada.map(p => `${p.nombre} x${p.cantidad}`).join(', ');

    this.detalleVenta.descripcion = [this.nombrePlato, this.nombreOferta].filter(x => x).join(' + ');
  }

  decisionObservacionSi() {
    this.decisionObservacion = 'Si';
  }

  decisionObservacionNo() {
    this.decisionObservacion = 'No';
  }

  onSubmit() {
    if(this.platoAgregado.length===0 && this.ofertaAgregada.length===0){
      Swal.fire('Oops...','No agregó ni platos ni ofertas','warning');
      return;
    }

    if (this.decisionObservacion === 'Si') {
      if (this.pedido.observacion.length === 0) {
        Swal.fire('Oops...', 'Si no tiene ninguna observación, seleccione el no', 'warning');
        return;
      } else if (this.pedidoObservacion.startsWith(' ')) {
        Swal.fire('Oops...', 'La observación no debe comenzar con un espacio', 'warning');
        return;
      }
    }

    this.venta.nombre="John";
    this.venta.username="john.doe@gmail.com"
    this.venta.estado_venta = 'Pendiente';
    this.venta.fecha = new Date().toLocaleString();

    this.mesaServicio.actualizarMesaLibre(this.id,this.mesa).pipe(
      tap(dato=>{
      }),
      catchError(err=>{
        console.error(err)
        return of(null)
      })
    ).subscribe()

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
    this.pedido.fecha_entrega = new Date().toLocaleString();

    this.pedidoServicio.registrarPedido(this.pedido).pipe(
      tap(dato => {
        this.registrarDetalleVenta();
      }),
      catchError(err => {
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
        this.irAPolleria();
      })
    ).subscribe()
  }

  guardarRelaciones() {
    if (this.platoAgregado.length > 0) {
      this.platosAgregadosFinal = this.platoAgregado.map(p => ({
        detalleVentaId: this.detalleVentaRelacion,
        platoId: p.id,
        cantidad_platos: p.cantidad
      }))
    }

    if (this.ofertaAgregada.length > 0) {
      this.ofertasAgregadasFinal = this.ofertaAgregada.map(o => ({
        detalleVentaId: this.detalleVentaRelacion,
        ofertaId: o.id,
        cantidad_oferta: o.cantidad
      }))
    }

    this.detalleVentaPlatoServicio.guardarLote(this.platosAgregadosFinal).subscribe({
      next: () => console.log(this.platosAgregadosFinal),
      error: err => console.error(err)
    });

    this.detalleVentaOfertaServicio.guardarLote(this.ofertasAgregadasFinal).subscribe({
      next: () => console.log(this.ofertasAgregadasFinal),
      error: err => console.error(err)
    })
  }

  irAPolleria() {
    this.router.navigate(['/polleria']);
  }
}
