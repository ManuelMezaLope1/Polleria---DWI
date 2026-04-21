import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';  // ← Agrega RouterLink
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../usuario/Usuario';
import { UsuarioServicio } from '../../servicios/usuario/usuario-servicio';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],  // ← Agrega RouterLink
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css'
})
export class IniciarSesionComponent {
  email:string;
  usuario: Usuario[]=[];

  constructor(private usuarioServicio: UsuarioServicio, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    
  }
}
