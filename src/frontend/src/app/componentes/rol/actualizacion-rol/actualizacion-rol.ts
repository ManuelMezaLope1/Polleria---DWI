import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rol } from '../Rol';
import { RolServicio } from '../../../servicios/rol/rol-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizacion-rol',
  imports: [FormsModule,CommonModule],
  templateUrl: './actualizacion-rol.html',
  styleUrl: './actualizacion-rol.css',
})
export class ActualizacionRol {
  id:number;
  rol: Rol=new Rol();

  constructor(private rolServicio: RolServicio, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['id'];

    this.rolServicio.obtenerRolPorId(this.id).pipe(
      tap(dato=>{
        Object.assign(this.rol,dato);
      }),
      catchError(error=>{
        console.error(error);
        return of(null);
      })
    ).subscribe()
  }

  irALaListaDeRoles(){
    Swal.fire({
      title: 'Rol actualizado',
      text: `El rol ${this.rol.nombre} ha sido actualizado con éxito`,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/pruebas'])
      }
    })
  }

  onSubmit(): void{
    if(this.rol){
      this.rolServicio.actualizarRol(this.id, this.rol).pipe(
        tap(dato=>{
          this.irALaListaDeRoles();
        }),
        catchError(error=>{
          console.error("Error al actualizar el rol: ",error);
          return of(null);
        })
      ).subscribe()
    }
  }
}
