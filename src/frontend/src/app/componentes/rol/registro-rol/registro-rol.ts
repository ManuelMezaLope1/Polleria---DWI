import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rol } from '../Rol';
import { RolServicio } from '../../../servicios/rol/rol-servicio';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-rol',
  imports: [FormsModule,CommonModule],
  templateUrl: './registro-rol.html',
  styleUrl: './registro-rol.css',
})
export class RegistroRol {
  rol: Rol=new Rol();

  constructor(private rolServicio: RolServicio, private router:Router){}

  ngOnInit(): void{}

  guardarRol(){
    this.rolServicio.registrarRol(this.rol).pipe(
      tap(dato=>{
        console.log(dato);
        this.irALaListaDeRoles();
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeRoles(){
    Swal.fire({
      title: 'Rol registrado',
      text: `El rol ${this.rol.nombre} ha sido registrado con éxito`,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/pruebas']);
      }
    })
  }

  onSubmit(){
    this.guardarRol();
  }
}
