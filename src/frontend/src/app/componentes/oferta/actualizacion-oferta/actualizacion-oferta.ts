import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Oferta } from '../Oferta';
import { OfertaServicio } from '../../../servicios/oferta/oferta-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError, of, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { Plato } from '../../plato/Plato';
import { PlatoServicio } from '../../../servicios/plato/plato-servicio';

@Component({
  selector: 'app-actualizacion-oferta',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizacion-oferta.html',
  styleUrl: './actualizacion-oferta.css',
})
export class ActualizacionOferta {
  id: number;
  oferta: Oferta = new Oferta;
  cantidadPlatosTotal: number = 0;
  platoSeleccionado: any = null
  platos: Plato[] = [];
  platos$!: Observable<Plato[]>;
  platoAgregado: any[] = [];

  constructor(private ofertaServicio: OfertaServicio, private platoServicio: PlatoServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.ofertaServicio.obtenerOfertaPorId(this.id).pipe(
      tap(dato => {
        Object.assign(this.oferta, dato);
        this.cantidadPlatosTotal = this.oferta.cantidad;
        this.platoAgregado.push(
          ...this.oferta.ofertaPlatos.map(op => ({
            id: op.plato.id,
            nombre: op.plato.nombre,
            precio: op.plato.precio,
            descripcion: op.plato.descripcion,
            imagen: op.plato.imagen,
            categoria: op.plato.categoria,
            cantidadPlatos: op.cantidad_platos
          }))
        );
        console.log(this.oferta.ofertaPlatos)
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe()

    this.platos$ = this.platoServicio.obtenerListaDePlatos().pipe(
      map(platos =>
        platos.sort((a, b) => a.nombre.localeCompare(b.nombre))
      )
    );
  }

  agregarPlato() {
    if (!this.platoSeleccionado) return;

    const platoExistente = this.platoAgregado.find(
      p => p.id === this.platoSeleccionado.id
    )

    if (platoExistente) {
      this.actualizarPrecio();
      this.actualizarDescripcion();
      this.cantidadPlatosTotal++;
      platoExistente.cantidadPlatos++;
    } else {
      this.platoAgregado.push({
        id: this.platoSeleccionado.id,
        nombre: this.platoSeleccionado.nombre,
        precio: this.platoSeleccionado.precio,
        descripcion: this.platoSeleccionado.descripcion,
        imagen: this.platoSeleccionado.imagen,
        categoria: this.platoSeleccionado.categoria,
        cantidadPlatos: 1
      })

      this.actualizarPrecio();
      this.actualizarDescripcion();
      this.cantidadPlatosTotal++
    }

    this.actualizarPrecio();
    this.actualizarDescripcion();
  }

  ofertaPlatoRelacion: any;

  quitarCantidadPlato(id: number, index: number) {
    this.id = id;
    const platoExistente = this.platoAgregado.find(
      p => p.id === this.id
    )

    if (platoExistente) {
      this.cantidadPlatosTotal--;
      platoExistente.cantidadPlatos--;

      this.actualizarDescripcion();
      this.actualizarPrecio();

      if (platoExistente.cantidadPlatos < 1) {
        this.platoAgregado.splice(index, 1)
        this.actualizarDescripcion();
        this.actualizarPrecio();
      }
    }

    this.actualizarDescripcion();
    this.actualizarPrecio();
  }

  quitarPlato(index: number) {
    this.platoAgregado.splice(index, 1);
    this.actualizarDescripcion();
    this.actualizarPrecio();
    this.cantidadPlatosTotal--
  }

  onSubmit() {
    if (this.oferta.precio_nuevo >= this.oferta.precio_actual) {
      Swal.fire('Oops...', 'El precio nuevo debe ser menor al precio actual', 'warning');
      return;
    }
    this.oferta.cantidad = this.cantidadPlatosTotal;
    this.guardarOferta();
  }

  guardarOferta() {
    this.ofertaServicio.registrarOferta(this.oferta).pipe(
      tap((ofertaGuardada: any) => {
        this.ofertaPlatoRelacion = ofertaGuardada.id;
        this.guardarRelaciones();
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }

  guardarRelaciones() {
    const relaciones = this.platoAgregado.map(plato => ({
      ofertaId: this.ofertaPlatoRelacion,
      platoId: plato.id,
      cantidad_platos: plato.cantidadPlatos
    }));

    console.log(relaciones);

    this.ofertaServicio.guardarLote(relaciones).subscribe({
      next: () => this.irALaListaDeOfertas(),
      error: err => console.error(err)
    })
  }

  irALaListaDeOfertas() {
    Swal.fire({
      title: 'Oferta actualizada',
      text: 'La oferta ha sido actualizada con éxito',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/platos']).then(() => {
          setTimeout(() => {
            const element = document.getElementById("ofertas");
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        });
      }
    })
  }

  actualizarDescripcion() {
    const unicos = [...new Set(this.platoAgregado)];

    this.oferta.descripcion = unicos
      .filter(p => p)
      .map(p => `${p.nombre} x${p.cantidadPlatos}`)
      .join(' + ');
  }

  actualizarPrecio() {
    this.oferta.precio_actual = this.platoAgregado
      .filter(p => p != null)
      .reduce((precio, p) => precio + (Number(p.precio) * p.cantidadPlatos), 0);
  }
}
