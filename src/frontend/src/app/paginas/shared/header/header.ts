import { Component, Injectable } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '../../../servicios/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeServicio } from '../../../servicios/global/theme-servicio';

@Component({
  selector: 'app-header',
  imports: [HttpClientModule,RouterLink,FormsModule,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})

@Injectable({
  providedIn: 'root'
})

export class Header {
title = '🍗 Pollería El Sazón';
  menuAbierto = false;

  constructor(public authService: Auth, private router: Router, public themeServicio: ThemeServicio) { }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/iniciar-sesion']);
  }

  cambiarTema(){
    this.themeServicio.toggleTheme();
  }
}
