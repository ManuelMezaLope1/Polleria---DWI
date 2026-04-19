import { Component } from '@angular/core';
import { Plato } from '../Plato';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-plato',
  imports: [],
  templateUrl: './lista-plato.html',
  styleUrl: './lista-plato.css',
})
export class ListaPlato {
  platos: Plato[] = [];

  constructor(private platoServicio: PlatoServicio, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPlato();
  }

  actualizarPlato(id: number) {
    this.router.navigate(['actualizar-plato', id]);
  }

  private obtenerPlato() {
    this.platoServicio.obtenerListaDePlatos().subscribe(dato => {
      this.platos = dato;
    })
  }

  eliminarPlato(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar el plato",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.platoServicio.eliminarPlato(id).subscribe(dato => {
          console.log(dato);
          this.obtenerPlato();
          Swal.fire(
            'Plato eliminado',
            'El plato ha sido eliminado con exito',
            'success'
          )
        })
      }
    });
  }
}
