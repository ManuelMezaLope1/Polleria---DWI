import { ChangeDetectorRef, Component } from '@angular/core';
import { Zona } from '../Zona';
import { ZonaServicio } from '../../../servicios/zona/zona-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizacion-zona',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './actualizacion-zona.html',
  styleUrl: './actualizacion-zona.css',
})
export class ActualizacionZona {
  id: number;
  zona: Zona = new Zona();

  constructor(private zonaServicio: ZonaServicio, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [''],
      departamento: [null],
      provincia: [null],
      distrito: [null]
    });

    this.id = this.route.snapshot.params['id'];

    this.zonaServicio.obtenerZonaPorId(this.id).pipe(
      tap(dato => {
        this.zona = dato;
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }

  onSubmit(): void {
    if (this.zona) {
      this.zonaServicio.actualizarZona(this.id, this.zona).pipe(
        tap(dato => {
          this.irALaListaDeZonas();
        }),
        catchError(err => {
          console.error("Error al actualizar la zona: ", err);
          return of(null)
        })
      ).subscribe()
    }
  }

  irALaListaDeZonas() {
    this.router.navigate(['/sistema']).then(() => {
      setTimeout(() => {
        const element = document.getElementById("zonas");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    });
    Swal.fire('Zona actualizada', `La zona ha sido actualizada con éxito`, 'success');
  }

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
