import { Routes } from '@angular/router';
import { ListaCategoria } from './componentes/categoria/lista-categoria/lista-categoria';
import { Prueba } from './paginas/prueba/prueba';
import { ActualizacionCategoria } from './componentes/categoria/actualizacion-categoria/actualizacion-categoria';
import { RegistroCategoria } from './componentes/categoria/registro-categoria/registro-categoria';
import { Inicio } from './paginas/inicio/inicio';
import { RegistrarseComponent } from './componentes/usuario/registrarse/registrarse';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion';
import { ActualizacionPlato } from './componentes/plato/actualizacion-plato/actualizacion-plato';
import { RegistroPlato } from './componentes/plato/registro-plato/registro-plato';
import { ActualizacionRol } from './componentes/rol/actualizacion-rol/actualizacion-rol';
import { RegistroRol } from './componentes/rol/registro-rol/registro-rol';
import { ActualizacionUsuario } from './componentes/usuario/actualizacion-usuario/actualizacion-usuario';
import { Promocion } from './paginas/promocion/promocion';
import { Contacto } from './paginas/contacto/contacto';

export const routes: Routes = [
    {path: '', redirectTo:'inicio', pathMatch:'full'},
    {path: 'inicio', component: Inicio},
    {path: 'carta', component: ListaCategoria},
    {path: 'pruebas', component: Prueba},
    {path: 'promocion', component: Promocion},
    {path: 'contacto', component: Contacto},

    { path: 'actualizacion-categoria/:id', component: ActualizacionCategoria },
    { path: 'actualizacion-plato/:id', component: ActualizacionPlato },
    { path: 'actualizacion-rol/:id', component: ActualizacionRol },
    { path: 'actualizacion-usuario/:id', component: ActualizacionUsuario },

    { path: 'creacion-categoria', component: RegistroCategoria },
    { path: 'creacion-plato', component: RegistroPlato },
    { path: 'creacion-rol', component: RegistroRol },

    {path: 'iniciar-sesion', component: IniciarSesionComponent},
    {path: 'registrarse', component: RegistrarseComponent}
];
