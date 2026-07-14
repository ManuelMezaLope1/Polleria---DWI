import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMesa } from '../../../componentes/pedido/IMesa';
import Swal from 'sweetalert2';
import { MesaServicio } from '../../../servicios/mesa/mesa-servicio';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-mesa',
  imports: [CommonModule, FormsModule],
  templateUrl: './mesa.html',
  styleUrl: './mesa.css',
})
export class Mesa {
  mesaSeleccionada: string = '';
  mesa1: any;
  active: string = 'salaUno';
  abriendo = false;

  mesa: IMesa = new IMesa();
  capacidadSeleccionada: any = null;

  mesaCuatro: any[]=[];
  cantidadMesas = Array(6).fill(0);

  constructor(private mesaServicio: MesaServicio, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.mesa.estado = "Pendiente";

    this.cargarMesasCuatro();
  }

  onPuertaTab(): void {
    this.active = "puerta";
  }

  abrirPuertas() {
    this.abriendo = true;

    setTimeout(() => {
      this.active = 'salaUno';
    }, 800);
  }

  entrarSalaUno() {
    this.active = "salaUno";
  }

  entrarSalaDos() {
    this.active = "salaDos";
  }

  entrarSalaTres() {
    this.active = "salaTres";
  }

  seleccionarMesa(piso: string, sala: string) {
    this.mesa.ubicacion = piso + " - " + sala;
  }

  cargarMesasCuatro(){
    this.mesaServicio.obtenerMesaCuatro().subscribe(datos=>{
      this.mesaCuatro=datos;
      this.cd.detectChanges();
    })
  }

  onSubmit() {
    this.mesa.capacidad = this.capacidadSeleccionada;

    if (this.mesa.nombre === undefined) {
      Swal.fire('Oops...', 'Falta el nombre', 'warning');
      return;
    } else if (this.mesa.nombre.startsWith(' ')) {
      Swal.fire('Oops...', 'El nombre no debe empezar con espacio', 'warning');
      return;
    }

    if (this.mesa.capacidad === undefined || this.mesa.capacidad === null) {
      Swal.fire('Oops...', 'Falta la capacidad', 'warning');
      return;
    }

    this.mesaServicio.registrarMesas(this.mesa).pipe(
      tap(dato => {
        console.log(this.mesa)
        this.irALaListaDeMesas();
      }),
      catchError(err => {
        console.error("ERROR COMPLETO:", err);
        console.error("STATUS:", err.status);
        console.error("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeMesas() {
    Swal.fire({
      title: 'Mesa registrada',
      text: `La mesa ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    }))
  }
}
