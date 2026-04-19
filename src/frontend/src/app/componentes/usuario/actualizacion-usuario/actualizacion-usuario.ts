import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rol } from '../../rol/Rol';
import { Usuario } from '../Usuario';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { RolServicio } from '../../../servicios/rol/rol-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizacion-usuario',
  imports: [CommonModule,FormsModule],
  templateUrl: './actualizacion-usuario.html',
  styleUrl: './actualizacion-usuario.css',
})
export class ActualizacionUsuario {
  id:number;
  usuario: Usuario=new Usuario();
  roles: Rol[]=[];

  constructor(private usuarioServicio: UsuarioServicio, private rolServicio: RolServicio, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['id'];

    this.usuarioServicio.obtenerUsuarioPorId(this.id).pipe(
      tap(dato=>{
        Object.assign(this.usuario,dato);
      }),
      catchError(error=>{
        console.error(error);
        return of(null);
      })
    ).subscribe()

    this.rolServicio.obtenerListaDeRoles().subscribe(dato=>{
      this.roles=dato;
    })
  }

  compararRoles(c1:any, c2:any): boolean{
    return c1 && c2 ? c1.id=== c2.id : c1===c2;
  }

  irALaListaDeUsuarios(){
    this.router.navigate(['/pruebas']);
    Swal.fire('Usuario actualizado',`El usuario ${this.usuario.nombre} ha sido actualizado con éxito`,'success');
  }

  onSubmit(): void{
    if(this.usuario){
      this.usuarioServicio.actualizarUsuario(this.id, this.usuario).pipe(
        tap(dato=>{
          this.irALaListaDeUsuarios();
        }),
        catchError(error=>{
          console.error("Error al actualizar el usuario: ",error);
          return of(null);
        })
      ).subscribe()
    }
  }
}
