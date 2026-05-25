import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './servicios/auth/auth';
import { CommonModule } from '@angular/common';
import { Header } from './paginas/shared/header/header';
import { Footer } from './paginas/shared/footer/footer';
import { ThemeServicio } from './servicios/global/theme-servicio';
import { tap, catchError, of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Chatbot } from './componentes/chatbot/chatbot';
import { PlatoServicio } from './servicios/plato/plato-servicio';
import { Plato } from './componentes/plato/Plato';
import { CategoriaServicio } from './servicios/categoria/categoria-servicio';
import { Categoria } from './componentes/categoria/Categoria';
import { ChatbotServicio } from './servicios/chatbot/chatbot-servicio';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [Header, Footer, RouterOutlet, HttpClientModule, FormsModule, CommonModule, MatPaginatorModule, MatTableModule, Chatbot],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  mensajes: any[] = [];

  mensaje = '';

  constructor(private chatServicio: ChatbotServicio, public themeServicio: ThemeServicio) { }

  ngOnInit(): void {
    this.chatServicio.obtenerInicio()
      .subscribe(resp => {
        this.mensajes.push({
          role: 'assistant',
          content: resp.respuesta
        });
      });
  }

  chatAbierto: boolean = false;

  toggleChat() {
    this.chatAbierto = !this.chatAbierto;
  }

  enviar() {
    if (this.mensaje.trim() === '') {
      return;
    }

    this.mensajes.push({
      role: 'user',
      content: this.mensaje
    });

    this.chatServicio
      .enviarMensaje(this.mensaje)
      .subscribe(resp => {
        this.mensajes.push({
          role: 'assistant',
          content: resp.respuesta
        });
      });

    this.mensaje = '';
  }

  /*categorias: Categoria[] = [];
  plato: Plato[] = [];
  nombre: string[] = [];
  nombrePlato: string[] = [];
  categoria: string = '';
  categoriaSelecionada: any;
 
  constructor(public themeServicio: ThemeServicio, public authServicio: Auth, private platoServicio: PlatoServicio, private categoriaServicio: CategoriaServicio, private router: Router, private cd: ChangeDetectorRef) {
    this.mensajes.push({
      texto: '¡Hola! 🍗 Soy el asistente virtual de El Sazón.\n\n¿En qué te puedo ayudar hoy?',
      esUsuario: false
    });
  }
 
  ngOnInit(): void {
    this.platoServicio.obtenerListaDePlatos().subscribe(dato => {
      this.plato = dato;
    })
 
    this.categoriaServicio.obtenerListaDeCategorias().pipe(
      tap(dato => {
        this.categorias = dato;
        this.categoria = [...new Set(
          this.categorias.map(c => c.nombre)
        )].join(', \n');
 
        this.categorias.forEach(categoria => {
 
          const platosCategoria = this.plato.filter(plato =>
            plato.categoria.nombre.toLowerCase() === categoria.nombre.toLowerCase()
          );
 
          console.log('Categoría:', categoria.nombre);
          console.log('Platos:', platosCategoria);
 
        });
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }
 
  mensajes: { texto: string, esUsuario: boolean }[] = [];
  nuevoMensaje: string = '';
  chatAbierto: boolean = false;
  cargando: boolean = false;
 
  enviarMensaje() {
    if (!this.nuevoMensaje.trim()) return;
 
    const mensaje = this.nuevoMensaje;
    this.mensajes.push({ texto: mensaje, esUsuario: true });
    this.nuevoMensaje = '';
    this.cargando = true;
 
    // Simulamos un pequeño retraso de escritura humana
    setTimeout(() => {
      this.procesarRespuesta(mensaje);
    }, 600);
  }
 
  estado: 'inicio' | 'carta' | 'categoria' = 'inicio';
 
  procesarRespuesta(mensaje: string) {
    let respuesta = '';
    const msg = mensaje.toLowerCase().trim();
 
    // 👉 1. Estado inicial
    if (this.estado === 'inicio') {
 
      if (msg.includes('carta') || msg.includes('menu')) {
        this.estado = 'carta';
 
        respuesta = '📋 Categorías disponibles:\n' +
          [...new Set(this.plato.map(p => p.categoria.nombre))].join('\n') +
          '\n\nEscribe una categoría para ver los platos.';
      }
 
    }
 
    // 👉 2. Usuario ya pidió carta
    else if (this.estado === 'carta') {
 
      const categoria = [...new Set(this.plato.map(p => p.categoria.nombre))]
        .find(c => c.toLowerCase() === msg);
 
      if (categoria) {
 
        this.estado = 'categoria';
 
        const platos = this.plato
          .filter(p => p.categoria.nombre.toLowerCase() === msg)
          .map(p => `🍽️ ${p.nombre} - S/${p.precio}`)
          .join('\n');
 
        respuesta = `📋 ${categoria.toUpperCase()}\n\n${platos}`;
      } else {
        respuesta = 'Escribe una categoría válida.';
      }
    }
    else {
      respuesta = '🍗 **EL SAZÓN - Pollería** 🍗\n\nNo logré entender bien tu consulta. Prueba escribiendo alguna de estas palabras clave:\n\n• **Carta** (Ver precios individuales)\n• **Promos** (Combos y ofertas)\n• **Mostrito** (El plato especial)\n• **Delivery** (Cómo pedir a casa)\n• **Dirección** o **Horario**';
    }
 
    this.mensajes.push({ texto: respuesta, esUsuario: false });
  }
 
  toggleChat() {
    this.chatAbierto = !this.chatAbierto;
  }*/
}
