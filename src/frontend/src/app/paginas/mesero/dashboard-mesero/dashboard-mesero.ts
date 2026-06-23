import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-mesero',
  imports: [CommonModule],
  templateUrl: './dashboard-mesero.html',
  styleUrl: './dashboard-mesero.css',
})
export class DashboardMesero {
  mesaSeleccionada: string = '';
  mesa1: any;
  active: string = 'puerta';
  abriendo=false;

  seleccionarMesa(mesa: string) {
    this.mesaSeleccionada = mesa;
    console.log(this.mesaSeleccionada)
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

  cerrarPuertas(){
    this.active='puerta';

    setTimeout(()=>{
      this.abriendo=false;
    }, 800);
  }
}
