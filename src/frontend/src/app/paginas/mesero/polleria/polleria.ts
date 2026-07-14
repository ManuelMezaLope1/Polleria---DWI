import { ChangeDetectorRef, Component } from '@angular/core';
import { OfertaMesa } from '../../../componentes/consulta/OfertaMesa';
import { PlatoMesa } from '../../../componentes/consulta/PlatoMesa';
import { IMesa } from '../../../componentes/pedido/IMesa';
import { PedidoPresencial } from '../../../componentes/pedido/PedidoPresencial';
import { OfertaServicio } from '../../../servicios/oferta/oferta-servicio';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-polleria',
  imports: [CommonModule,FormsModule],
  templateUrl: './polleria.html',
  styleUrl: './polleria.css',
})
export class Polleria {
  mesaSeleccionada: string = '';
  mesa1: any;
  active: string = 'salaUno';
  abriendo=false;
  
  activeModal: string='pedidoActual';
  activePlato: string='platoMesa';

  platoSeleccionado: any=null;
  ofertaSeleccionada: any=null;

  pedidoActual: any[]=[];
  mesa: IMesa=new IMesa();
  pedidoPresencial: PedidoPresencial=new PedidoPresencial();

  platos: PlatoMesa[]=[];
  ofertas: OfertaMesa[]=[];

  constructor(private platoServicio: PlatoServicio, private ofertaServicio: OfertaServicio, private cd: ChangeDetectorRef){}

  ngOnInit(): void{
    this.platoServicio.obtenerPlatoMesa().subscribe(dato=>{
      this.platos=dato;
      console.log(this.platos)
      this.cd.detectChanges();
    });

    this.ofertaServicio.obtenerOfertaMesa().subscribe(dato=>{
      this.ofertas=dato;
      console.log(this.ofertas)
      this.cd.detectChanges();
    })
  }

  seleccionarMesa(mesa: string) {
    this.mesaSeleccionada = mesa;
    this.mesa.nombre=this.mesaSeleccionada;
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

  entrarSalaUno(){
    this.active="salaUno";
  }

  entrarSalaDos(){
    this.active="salaDos";
  }

  entrarSalaTres(){
    this.active="salaTres";
  }

  pedidoActualTab(){
    this.activeModal='pedidoActual'
  }

  nuevoPedidoTab(){
    this.activeModal='nuevoPedido'
  }

  platosMesaTab(){
    this.activePlato='platoMesa';
  }

  ofertasMesaTab(){
    this.activePlato='ofertaMesa';
  }
}
