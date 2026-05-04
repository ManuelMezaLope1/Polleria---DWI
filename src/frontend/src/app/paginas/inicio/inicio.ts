import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Auth } from '../../servicios/auth/auth';
import { NavigationEnd, Router } from '@angular/router';
import { OfertaServicio } from '../../servicios/oferta/oferta-servicio';
import { Oferta } from '../../componentes/oferta/Oferta';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements AfterViewInit {
  constructor(public authServicio: Auth, private router: Router, private ofertaServicio: OfertaServicio) { }

  getAhorro(ofe: any): number {
    return ofe.precio_actual - ofe.precio_nuevo;
  }

  hacerPedido() {
    window.open('https://wa.me/51987654321?text=Hola%2C%20quiero%20hacer%20un%20pedido', '_blank');
  }

  verMenu() {
    this.router.navigate(['/carta']);
  }

  pedirCombo(nombreCombo: string) {
    window.open(`https://wa.me/51987654321?text=Hola%2C%20quiero%20pedir%20el%20${encodeURIComponent(nombreCombo)}`, '_blank');
  }

  // Estos métodos ahora están DENTRO de la clase
  ngAfterViewInit() {
    this.crearParticulas();
  }

  ofertas$!: Observable<Oferta[]>;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })

    this.ofertas$ = this.ofertaServicio.obtenerListaDeOfertas();
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
