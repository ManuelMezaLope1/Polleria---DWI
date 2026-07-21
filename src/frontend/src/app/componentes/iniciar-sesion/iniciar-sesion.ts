import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';  // ← Agrega RouterLink
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../servicios/auth/auth';
import { HttpClient } from '@angular/common/http';
import { ZonaServicio } from '../../servicios/zona/zona-servicio';
import { Zona } from '../zona/Zona';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css'
})
export class IniciarSesionComponent {
  zonas: Zona[] | null;

  constructor(private authService: Auth, private router: Router, private http: HttpClient, private zonaServicio: ZonaServicio, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cd.detectChanges();
    this.zonaServicio.obtenerListaDeZonas().subscribe(dato => {
      this.zonas = dato;
      this.cd.detectChanges();
    });
  }

  active: string = "login";

  onLoginTab(): void {
    this.active = "login";
  }

  onRegistroTab(): void {
    this.active = "registro";
  }

  form = {
    username: '',
    password: ''
  };

  error = '';

  login() {
    this.authService.login(this.form).subscribe({
      next: res => {
        this.authService.guardarToken(res.token);
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        const rol = payload.roles[0];
        
        Swal.fire({
          title: 'Login éxitoso',
          text: 'Inicio sesión correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            if(rol==='ROLE_USER'){
              this.router.navigate(['/inicio']).then(() => window.location.reload());
            } else if(rol==='ROLE_ADMIN'){
              this.router.navigate(['/dashboard']).then(() => window.location.reload());
            } else if(rol==='ROLE_COCINERO'){
              this.router.navigate(['/dashboard-cocinero']).then(() => window.location.reload());
            } else if(rol==='ROLE_MESERO'){
              this.router.navigate(['/elegir-mesero']).then(() => window.location.reload());
            } else {
              this.router.navigate(['/inicio']).then(() => window.location.reload());
            }
          }
        })
      },
      error: err => {
        Swal.fire('Oops...', 'Usuario o contraseña incorrecto', 'warning');
        this.error = 'Credenciales incorrectas';
      }
    });
  }

  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  registroPassword: string = '';
  direccion: string = '';
  telefono: string = '';
  zonaId: string | null = null;

  registro() {
    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.correo,
      password: this.registroPassword,
      direccion: this.direccion,
      telefono: this.telefono,
      zona: {
        id: this.zonaId
      }
    };

    this.http.post('http://localhost:8080/auth/registro', usuario)
      .subscribe({
        next: () => {
          Swal.fire('Felicidades','Se registró con éxito','success');

          this.active = 'login';

          this.nombre = '';
          this.apellido = '';
          this.correo = '';
          this.registroPassword = '';
          this.direccion = '';
          this.telefono = '';

          this.router.navigate(['/iniciar-sesion']);
        },
        error: () => {
          Swal.fire('Oops...','Error al registrar el usuario','error');
        }
      })
  }
}
