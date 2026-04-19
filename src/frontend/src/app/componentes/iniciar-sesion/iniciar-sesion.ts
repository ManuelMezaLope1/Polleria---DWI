import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';  // ← Agrega RouterLink
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],  // ← Agrega RouterLink
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css'
})
export class IniciarSesionComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.email && this.password) {
      console.log('Iniciando sesión con:', this.email);
      localStorage.setItem('usuario', this.email);
      alert('✅ ¡Sesión iniciada correctamente!');
      this.router.navigate(['/inicio']);
    } else {
      alert('❌ Por favor, completa todos los campos');
    }
  }

  loginWithGoogle() {
    alert('🔐 Próximamente: Inicio de sesión con Google');
  }

  loginWithFacebook() {
    alert('🔐 Próximamente: Inicio de sesión con Facebook');
  }
}
