import { Component } from '@angular/core';
import { OfertaServicio } from '../../servicios/oferta/oferta-servicio';
import { Observable } from 'rxjs';
import { Oferta } from '../../componentes/oferta/Oferta';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promocion',
  imports: [CommonModule],
  templateUrl: './promocion.html',
  styleUrl: './promocion.css',
})
export class Promocion {
  constructor(private ofertaServicio: OfertaServicio, private router: Router) { }

  ofertas$!: Observable<Oferta[]>;

  getDescuento(ofe: any): number {
    if (!ofe.precio_actual) return 0;
    const porcentaje = ((ofe.precio_actual - ofe.precio_nuevo) / ofe.precio_actual) * 100;
    return Math.round(porcentaje);
  }

  ngOnInit(): void {
    this.ofertas$ = this.ofertaServicio.obtenerListaDeOfertas();
  }

  realizarCompra(id: number){
    this.router.navigate(['carro/oferta',id]).then(() => {
      setTimeout(() => {
        const element = document.getElementById("compras");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }
}
