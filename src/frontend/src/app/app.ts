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
}
