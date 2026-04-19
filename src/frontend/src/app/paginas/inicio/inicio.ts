import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements AfterViewInit {

  hacerPedido() {
    window.open('https://wa.me/51987654321?text=Hola%2C%20quiero%20hacer%20un%20pedido', '_blank');
  }

  verMenu() {
    alert('📋 Nuestro menú: Pollo a la Brasa, Broaster, Parrillas, Ensaladas y más!');
  }

  pedirCombo(nombreCombo: string) {
    window.open(`https://wa.me/51987654321?text=Hola%2C%20quiero%20pedir%20el%20${encodeURIComponent(nombreCombo)}`, '_blank');
  }

  // Estos métodos ahora están DENTRO de la clase
  ngAfterViewInit() {
    this.crearParticulas();
  }

  crearParticulas() {
    const container = document.querySelector('.pollería-container');
    if (container) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = Math.random() * 5 + 2 + 'px';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = Math.random() * 5 + 5 + 's';
        container.appendChild(particle);
      }
    }
  }
}
