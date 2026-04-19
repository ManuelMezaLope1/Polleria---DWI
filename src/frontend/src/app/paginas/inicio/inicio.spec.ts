// inicio.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent {

  constructor(private router: Router) {}

  hacerPedido() {
    // Redirigir a WhatsApp o a página de pedidos
    window.open('https://wa.me/51987654321?text=Hola%2C%20quiero%20hacer%20un%20pedido', '_blank');
  }

  verMenu() {
    // Redirigir a sección de menú o mostrar modal
    alert('📋 Nuestro menú: Pollo a la Brasa, Broaster, Parrillas, Ensaladas y más!');
  }
}
