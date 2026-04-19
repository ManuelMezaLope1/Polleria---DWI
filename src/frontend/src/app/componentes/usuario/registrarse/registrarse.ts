import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';  // ← Agrega RouterLink aquí
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../Usuario';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { RolServicio } from '../../../servicios/rol/rol-servicio';
import { Rol } from '../../rol/Rol';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [FormsModule, CommonModule],  // ← Agrega RouterLink aquí también
  templateUrl: './registrarse.html',
  styleUrl: './registrarse.css'
})
export class RegistrarseComponent {
  usuario: Usuario=new Usuario();
  roles: Rol[]=[];

  constructor(private usuarioServicio: UsuarioServicio, private rolServicio: RolServicio, private router: Router) {}

  ngOnInit(): void{
    this.rolServicio.obtenerListaDeRoles().subscribe(dato=>{
      this.roles=dato;
    })
  }

  guardarUsuario(){
    this.usuarioServicio.registrarUsuario(this.usuario).pipe(
      tap(dato=>{
        console.log(dato);
        this.irALogin();
      }),
      catchError(err=>{
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALogin(){
    Swal.fire({
      title: 'Usuario registrado',
      text: `El usuario ${this.usuario.nombre} ha sido registrado con éxito`,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/login']);
      }
    })
  }

  onSubmit(){
    this.guardarUsuario();
  }
}
