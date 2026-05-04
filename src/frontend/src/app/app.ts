import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './servicios/auth/auth';
import { CommonModule } from '@angular/common';
import { Header } from './paginas/shared/header/header';
import { Footer } from './paginas/shared/footer/footer';
import { ThemeServicio } from './servicios/global/theme-servicio';

@Component({
  selector: 'app-root',
  imports: [Header,Footer,RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  constructor(public themeServicio: ThemeServicio, public authServicio: Auth, private router: Router){}

  ngOnInit(){
    this.themeServicio.setTheme(this.themeServicio.getTheme());
  }

  venta(){
    this.router.navigate(['/carro']);
  }
}
