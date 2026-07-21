import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MesaServicio } from '../../../servicios/mesa/mesa-servicio';
import { ConsultaServicio } from '../../../servicios/consulta/consulta-servicio';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard-mesero',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-mesero.html',
  styleUrl: './dashboard-mesero.css',
})
export class DashboardMesero {
  id: number;
  active: string = "inicio";
  activeMesas: string = "cuatro";
  mesasActuales: any[]=[];
  cantidadMesasPendientes: any;
  cantidadMesasLibres: any;
  cantidadMesasEsperando: any;
  cantidadMesasComiendo: any;

  mesasCuatro: any[] = [];
  mesasSeis: any[] = [];
  mesasOcho: any[] = [];
  mesasDiez: any[] = [];

  ventasMesa: any[]=[];
  cantidadVentasMesa: any;
  totalVentasMesa: any;
  cantidadPlatosMesa: any;
  cantidadOfertasMesa: any;
  cantidadesMesa: any[]=[];

  constructor(private mesaServicio: MesaServicio, private consultaServicio: ConsultaServicio, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.mesaServicio.obtenerTodasLasMesas().subscribe(datos => {
      this.mesasActuales=datos.filter(d=>d.nombre!=='Sin nombre');
      this.cantidadMesasLibres = datos.filter(d => d.estado === 'Libre').filter(d=>d.nombre!=='Sin nombre').length;
      this.cantidadMesasPendientes = datos.filter(d => d.estado === 'Pendiente').filter(d=>d.nombre!=='Sin nombre').length;
      this.cantidadMesasEsperando = datos.filter(d => d.estado === 'Preparando').filter(d=>d.nombre!=='Sin nombre').length;
      this.cantidadMesasComiendo = datos.filter(d => d.estado === 'Listo').filter(d=>d.nombre!=='Sin nombre').length
      this.cd.detectChanges();
    })

    this.cargarMesas();
    this.cargarCantidadesMesa();
  }

  onInicioTab() {
    this.active = "inicio";
  }

  onMesasTab() {
    this.active = "mesas";
  }

  onVentasHoyTab() {
    this.active = "ventasHoy";
  }

  onMesasCuatroTab() {
    this.activeMesas = "cuatro";
  }

  onMesasSeisTab() {
    this.activeMesas = "seis";
  }

  onMesasOchoTab() {
    this.activeMesas = "ocho";
  }

  onMesasDiezTab() {
    this.activeMesas = "diez";
  }

  cargarMesas() {
    this.mesaServicio.obtenerMesaCuatro().subscribe(datos => {
      this.mesasCuatro = datos;
      this.cd.detectChanges();
    })

    this.mesaServicio.obtenerMesaSeis().subscribe(datos => {
      this.mesasSeis = datos;
      this.cd.detectChanges();
    })

    this.mesaServicio.obtenerMesaOcho().subscribe(datos => {
      this.mesasOcho = datos;
      this.cd.detectChanges();
    })

    this.mesaServicio.obtenerMesaDiez().subscribe(datos => {
      this.mesasDiez = datos;
      this.cd.detectChanges();
    })
  }

  obtenerVentasPorMesaId(id: number) {
    this.id = id;

    this.consultaServicio.obtenerVentasPorMesa(this.id).subscribe({
      next: (datos) => {
        this.ventasMesa=datos;

        this.cd.detectChanges();

        const modal = new bootstrap.Modal(
          document.getElementById('exampleModal')!
        );

        modal.show();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  cargarCantidadesMesa(){
    this.mesaServicio.obtenerCantidadTotalVentasMesa().subscribe(dato=>{
      this.cantidadVentasMesa=dato.cantidad;
      this.totalVentasMesa=dato.suma;
      this.cd.detectChanges();
    });

    this.mesaServicio.obtenerCantidadPlatosMesa().subscribe(dato=>{
      this.cantidadPlatosMesa=dato.cantidad;
      this.cd.detectChanges();
    });

    this.mesaServicio.obtenerCantidadOfertasMesa().subscribe(dato=>{
      this.cantidadOfertasMesa=dato.cantidad;
      this.cd.detectChanges();
    });

    this.mesaServicio.obtenerCantidadesVentasMesa().subscribe(datos=>{
      this.cantidadesMesa=datos;
      console.log(this.cantidadesMesa);
      this.cd.detectChanges();
    })
  }
}
