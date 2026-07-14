import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '../../../servicios/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeServicio } from '../../../servicios/global/theme-servicio';

@Component({
  selector: 'app-header',
  imports: [HttpClientModule, RouterLink, FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})

@Injectable({
  providedIn: 'root'
})

export class Header {
  title = '🍗 Pollería El Sazón';
  menuAbierto = false;
  token: any;
  usuarioRol: any;
  rol: any;

  constructor(public authService: Auth, private router: Router, public themeServicio: ThemeServicio, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cd.detectChanges();
    this.token = this.authService.obtenerToken();

    const payload = JSON.parse(atob(this.token.split('.')[1]));
    const rol = payload.roles[0];

    this.rol=rol;
    this.cd.detectChanges();
    this.usuarioRol=this.rol;
    this.cd.detectChanges();
  }

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

  cambiarTema() {
    this.themeServicio.toggleTheme();
  }

  irDashboard(role:string){
    if(role==='ROLE_ADMIN'){
      this.router.navigate(['/dashboard']);
    } else if(role==='ROLE_COCINERO'){
      this.router.navigate(['/dashboard-cocinero']);
    } else if(role==='ROLE_MESERO'){
      this.router.navigate(['/elegir-mesero'])
    }
  }
}
