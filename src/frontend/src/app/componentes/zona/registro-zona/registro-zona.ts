import { Component } from '@angular/core';
import { Zona } from '../Zona';
import { ZonaServicio } from '../../../servicios/zona/zona-servicio';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-zona',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registro-zona.html',
  styleUrl: './registro-zona.css',
})
export class RegistroZona {
  zona: Zona = new Zona();

  constructor(private zonaServicio: ZonaServicio, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [''],
      departamento: [null],
      provincia: [null],
      distrito: [null]
    });

    this.form.get('departamento')?.valueChanges.subscribe(departamento => {
      this.provinciasFiltradas = this.provincias[departamento] || [];

      if (this.provinciasFiltradas.length > 0) {
        this.form.get('provincia')?.setValue(this.provinciasFiltradas[0]);
      } else {
        this.form.get('provincia')?.setValue(null);
      }
    });
  }

  guardarZona() {
    const zonaForm = this.form.value;

    this.zonaServicio.registrarZona(zonaForm).pipe(
      tap(dato => {
        this.irALaListaDeZonas();
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe();
  }

  irALaListaDeZonas() {
    Swal.fire({
      title: 'Zona registrada',
      text: `La zona ${this.zona.nombre} ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/pruebasexternas']);
      }
    })
  }

  onSubmit() {
    this.guardarZona();
  }

  form!: FormGroup;

  departamentos = ['Arequipa','Ayacucho','Cajamarca','Callao','Cusco','Ica','LaLibertad','Lima','Piura','Tacna'];

  provincias: any = {
    Arequipa: ['Arequipa', 'Camaná', 'Caravelí','Castilla','Caylloma','Condesuyos','Islay','La Unión'],
    Ayacucho: ['Cangallo', 'Huanta', 'Huamanga','Parinacochas','Sucre','Vilcashuamán'],
    Cajamarca: ['Cajamarca','Cajabamba','Chota','Cutervo','San Jaén','San Marcos','Santa Cruz'],
    Callao: ['Callao'],
    Cusco: ['Acomayo','Canas','Cusco','La Convención','Paruro','Urubamba'],
    Ica: ['Ica','Chincha','Nazca','Palpa','Pisco'],
    LaLibertad: ['Bolívar','Chepén','Gran Chimú','Otuzco','Pacasmayo','Trujillo'],
    Lima: ['Barranca','Cañete','Huarochirí','Lima'],
    Piura: ['Huancabamba','Piura','Sullana','Talara'],
    Tacna: ['Tacna','Candarave','Jorge Basadre','Tarata']
  }

  provinciasFiltradas: string[] = [];
}
