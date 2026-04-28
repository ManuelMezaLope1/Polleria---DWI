import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';  // ← Agrega RouterLink
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../servicios/auth/auth';
import { HttpClient } from '@angular/common/http';
import { ZonaServicio } from '../../servicios/zona/zona-servicio';
import { Zona } from '../zona/Zona';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css'
})
export class IniciarSesionComponent {
  zonas: Zona[]=[];

  ngOnInit(): void{
    this.zonaServicio.obtenerListaDeZonas().subscribe(dato=>{
      this.zonas=dato;
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

  constructor(
    private authService: Auth,
    private router: Router,
    private http: HttpClient,
    private zonaServicio: ZonaServicio
  ) {}

  login() {
    this.authService.login(this.form).subscribe({
      next: res => {
        this.authService.guardarToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }

  nombre: string='';
  apellido:string='';
  correo:string='';
  registroPassword:string='';
  direccion:string='';
  telefono:string='';
  zonaId:string='';

  registro(){
    const usuario={
      nombre:this.nombre,
      apellido:this.apellido,
      username:this.correo,
      password:this.registroPassword,
      direccion:this.direccion,
      telefono:this.telefono,
      zona:{
        id:this.zonaId
      }
    };

    this.http.post('http://localhost:8080/auth/registro', usuario)
      .subscribe({
        next:()=>{
          alert('Usuario registrado correctamente');

          this.active='login';

          this.nombre='';
          this.apellido='';
          this.correo='';
          this.registroPassword='';
          this.direccion='';
          this.telefono='';

          this.router.navigate(['/iniciar-sesion']);
        },
        error:()=>{
          alert('Error al registrar el usuario');
        }
      })
  }
}
