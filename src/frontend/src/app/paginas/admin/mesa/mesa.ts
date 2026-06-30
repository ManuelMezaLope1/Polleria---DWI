import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMesa } from '../../../componentes/pedido/IMesa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  imports: [CommonModule, FormsModule],
  templateUrl: './mesa.html',
  styleUrl: './mesa.css',
})
export class Mesa {
  mesaSeleccionada: string = '';
  mesa1: any;
  active: string = 'salaUno';
  abriendo = false;

  mesa: IMesa = new IMesa();
  capacidadSeleccionada: any=null;

  ngOnInit(): void{
    this.mesa.estado="Pendiente";
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

  seleccionarMesa(piso: string, sala: string){
    this.mesa.ubicacion=piso + " - " + sala;
  }
  
  onSubmit(){
    this.mesa.capacidad=this.capacidadSeleccionada;

    if(this.mesa.nombre===undefined){
      Swal.fire('Oops...','Falta el nombre','warning');
      return;
    } else if(this.mesa.nombre.startsWith(' ')){
      Swal.fire('Oops...','El nombre no debe empezar con espacio','warning');
      return;
    }

    if(this.mesa.capacidad===undefined || this.mesa.capacidad===null){
      Swal.fire('Oops...','Falta la capacidad','warning');
      return;
    }

    console.log(this.mesa)
  }
}
