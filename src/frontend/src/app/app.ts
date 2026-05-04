import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './servicios/auth/auth';
import { CommonModule } from '@angular/common';
import { Header } from './paginas/shared/header/header';
import { Footer } from './paginas/shared/footer/footer';
import { ThemeServicio } from './servicios/global/theme-servicio';
import { UsuarioServicio } from './servicios/usuario/usuario-servicio';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  usuario: any;
  username: string;
  esAdmin: boolean = false;

  constructor(public themeServicio: ThemeServicio, public authServicio: Auth, private usuarioServicio: UsuarioServicio, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.themeServicio.setTheme(this.themeServicio.getTheme());

    this.usuarioServicio.obtenerPerfil().pipe(
      tap(data => {
        this.usuario = data;

        this.esAdmin = this.usuario?.roles?.some(
          (r: any) => r.nombre === 'ROLE_ADMIN'
        ) ?? false;

        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe()
  }

  irDashboard() {
    this.router.navigate(['/dashboard']);
  }

  venta() {
    this.router.navigate(['/carro']);
  }
}
