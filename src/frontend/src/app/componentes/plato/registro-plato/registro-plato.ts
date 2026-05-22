import { ChangeDetectorRef, Component } from '@angular/core';
import { Plato } from '../Plato';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaServicio } from '../../../servicios/categoria/categoria-servicio';
import { Categoria } from '../../categoria/Categoria';

@Component({
  selector: 'app-registro-plato',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-plato.html',
  styleUrl: './registro-plato.css',
})
export class RegistroPlato {
  plato: Plato = new Plato();
  categorias: Categoria[] = [];

  constructor(private cd: ChangeDetectorRef, private platoServicio: PlatoServicio, private categoriaServicio: CategoriaServicio, private router: Router) {
    this.plato.categoria = null;
  }

  ngOnInit(): void {
    this.categoriaServicio.obtenerListaDeCategorias().subscribe(dato => {
      this.categorias = dato;
      this.cd.detectChanges();
    });
  }

  IrALaListaDePlatos() {
    this.router.navigate(['/pruebas']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("platos");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
    Swal.fire('Plato registrado', `El plato ${this.plato.nombre} ha sido registrado correctamente`, 'success');
  }

  onSubmit() {
    const formData=new FormData();

    formData.append(
      'plato',
      new Blob(
        [JSON.stringify(this.plato)],
        { type: 'application/json' }
      )
    );

    formData.append(
      'imagen',
      this.imagenSeleccionada
    )

    this.platoServicio.registrarPlato(formData).pipe(
      tap(dato => {
        console.log(dato);
        this.IrALaListaDePlatos();
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  imagenSeleccionada!: File;
  imagenPreview: any;

  seleccionarImagen(event: any): void {
    this.imagenSeleccionada = event.target.files[0];
    if (this.imagenSeleccionada) {
      const reader = new FileReader();
      reader.readAsDataURL(this.imagenSeleccionada);
      reader.onload = () => {
        this.imagenPreview = reader.result;
        this.cd.detectChanges();
      }; 
    }
  }
}
