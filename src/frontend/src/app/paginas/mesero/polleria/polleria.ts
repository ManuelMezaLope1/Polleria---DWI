import { ChangeDetectorRef, Component } from '@angular/core';
import { OfertaMesa } from '../../../componentes/consulta/OfertaMesa';
import { PlatoMesa } from '../../../componentes/consulta/PlatoMesa';
import { IMesa } from '../../../componentes/pedido/IMesa';
import { PedidoPresencial } from '../../../componentes/pedido/PedidoPresencial';
import { OfertaServicio } from '../../../servicios/oferta/oferta-servicio';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MesaServicio } from '../../../servicios/mesa/mesa-servicio';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { ConsultaServicio } from '../../../servicios/consulta/consulta-servicio';
import { Venta } from '../../../componentes/venta/Venta';
import { VentaServicio } from '../../../servicios/venta/venta-servicio';
import { catchError, of, tap } from 'rxjs';
import { MetodopagoServicio } from '../../../servicios/metodopago/metodopago-servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-polleria',
  imports: [CommonModule, FormsModule],
  templateUrl: './polleria.html',
  styleUrl: './polleria.css',
})
export class Polleria {
  mesaSeleccionada: string = '';
  mesa1: any;
  active: string = 'salaUno';
  abriendo = false;

  activeModal: string = 'pedidoActual';
  activePlato: string = 'platoMesa';

  platoSeleccionado: any = null;
  ofertaSeleccionada: any = null;

  pedidoActual: any[] = [];
  mesa: IMesa = new IMesa();
  idMesa: any;
  venta: Venta = new Venta();
  idVenta: any;
  pedidoPresencial: PedidoPresencial = new PedidoPresencial();

  platos: PlatoMesa[] = [];
  ofertas: OfertaMesa[] = [];

  mesaCuatro: any[] = [];
  cantidadMesas = Array(6).fill(0);

  mesaSeis: any[] = [];
  cantidadMesasSeis = Array(4).fill(0);

  mesaOcho: any[] = [];
  cantidadMesasOcho = Array(6).fill(0);

  mesaDiez: any[] = [];
  cantidadMesasDiez = Array(4).fill(0);

  id: number;
  mesaParaOrdenar: any;
  metodoPago: any[] = [];
  metodoPagoSeleccionado: any;

  constructor(private platoServicio: PlatoServicio, private ofertaServicio: OfertaServicio, private mesaServicio: MesaServicio, private ventaServicio: VentaServicio, private metodoPagoServicio: MetodopagoServicio, private consultaServicio: ConsultaServicio, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarMesasCuatro();
    this.cargarMesasSeis();
    this.cargarMesasOcho();
    this.cargarMesasDiez();

    this.platoServicio.obtenerPlatoMesa().subscribe(dato => {
      this.platos = dato;
      this.cd.detectChanges();
    });

    this.ofertaServicio.obtenerOfertaMesa().subscribe(dato => {
      this.ofertas = dato;
      this.cd.detectChanges();
    });

    this.metodoPagoServicio.obtenerListaDeMetodoPago().subscribe(dato => {
      this.metodoPago = dato.filter(mp => mp.nombre !== 'Pendiente');
      console.log(this.metodoPago)
      this.cd.detectChanges();
    })
  }

  seleccionarMesa(mesa: string) {
    this.mesaSeleccionada = mesa;
    this.mesa.nombre = this.mesaSeleccionada;
  }

  onPuertaTab(): void {
    this.active = "puerta";
  }

  abrirPuertas() {
    this.abriendo = true;

    setTimeout(() => {
      this.active = 'salaUno';
    }, 800);
  }

  entrarSalaUno() {
    this.active = "salaUno";
  }

  entrarSalaDos() {
    this.active = "salaDos";
  }

  entrarSalaTres() {
    this.active = "salaTres";
  }

  pedidoActualTab() {
    this.activeModal = 'pedidoActual'
  }

  nuevoPedidoTab() {
    this.activeModal = 'nuevoPedido'
  }

  platosMesaTab() {
    this.activePlato = 'platoMesa';
  }

  ofertasMesaTab() {
    this.activePlato = 'ofertaMesa';
  }

  cargarMesasCuatro() {
    this.mesaServicio.obtenerMesaCuatro().subscribe(datos => {
      this.mesaCuatro = datos;
      this.cd.detectChanges();
    })
  }

  cargarMesasSeis() {
    this.mesaServicio.obtenerMesaSeis().subscribe(datos => {
      this.mesaSeis = datos;
      this.cd.detectChanges();
    })
  }

  cargarMesasOcho() {
    this.mesaServicio.obtenerMesaOcho().subscribe(datos => {
      this.mesaOcho = datos;
      this.cd.detectChanges();
    })
  }

  cargarMesasDiez() {
    this.mesaServicio.obtenerMesaDiez().subscribe(datos => {
      this.mesaDiez = datos;
      this.cd.detectChanges();
    })
  }

  obtenerMesaPorId(id: number) {
    this.id = id;

    this.mesaServicio.obtenerMesaPorId(id).subscribe({
      next: (datos) => {
        this.mesaParaOrdenar = datos;

        this.cd.detectChanges();

        this.consultaServicio.obtenerPedidoActualMesa(id).subscribe(datos => {
          this.pedidoActual = datos
          this.cd.detectChanges();
        })

        const modal = new bootstrap.Modal(
          document.getElementById('exampleModal')!
        );

        modal.show();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  irRegistrarPedidoMesa(id: number) {
    const modalElement = document.getElementById('exampleModal');

    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);

      modalElement.addEventListener(
        'hidden.bs.modal',
        () => {
          this.router.navigate(['registro-pedido-mesa', id]);
        },
        { once: true }
      );

      modal?.hide();
    }
  }

  seleccionarItem(item: any): void {
    this.metodoPagoSeleccionado = item;
    this.venta.metodopago = this.metodoPagoSeleccionado;
  }

  completarPedidoMesa(idMesa: number, idVenta: number) {
    this.idMesa = idMesa;
    this.idVenta = idVenta;

    if (this.venta.metodopago === undefined) {
      Swal.fire('Oops...', 'Seleccione un método de pago', 'warning');
      return;
    }

    Swal.fire({
      title: 'Felicidades',
      text: 'Se completó esta mesa',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mesaServicio.actualizarMesaLista(this.idMesa, this.mesa).pipe(
          tap(dato => {
          }),
          catchError(err => {
            console.error(err)
            return of(null)
          })
        ).subscribe();

        this.ventaServicio.actualizarMetodoPago(this.idVenta, this.venta).pipe(
          tap(dato => {
            window.location.reload();
          }),
          catchError(err => {
            console.error(err)
            return of(null);
          })
        ).subscribe();
      }
    })
  }
}
