import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';  // ← Agrega RouterLink aquí
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],  // ← Agrega RouterLink aquí también
  templateUrl: './registrarse.html',
  styleUrl: './registrarse.css'
})
export class RegistrarseComponent {
  nombre = '';
  telefono = '';
  email = '';
  password = '';
  confirmarPassword = '';
  aceptaTerminos = false;

  constructor(private router: Router) {}

  registrarse() {
    if (!this.nombre || !this.email || !this.password || !this.confirmarPassword) {
      alert('❌ Por favor, completa todos los campos obligatorios');
      return;
    }

    if (this.password !== this.confirmarPassword) {
      alert('❌ Las contraseñas no coinciden');
      return;
    }

    if (!this.aceptaTerminos) {
      alert('❌ Debes aceptar los términos y condiciones');
      return;
    }

    if (this.password.length < 6) {
      alert('❌ La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Aquí iría la lógica de registro con tu backend
    console.log('Registrando usuario:', {
      nombre: this.nombre,
      telefono: this.telefono,
      email: this.email
    });

    // Simular registro exitoso
    localStorage.setItem('usuario', this.email);
    alert('✅ ¡Registro exitoso! Ahora puedes iniciar sesión');
    this.router.navigate(['/iniciar-sesion']);
  }

  registerWithGoogle() {
    alert('🔐 Próximamente: Registro con Google');
  }

  registerWithFacebook() {
    alert('🔐 Próximamente: Registro con Facebook');
  }
}
