import { RouterModule, Routes } from '@angular/router';
import { ListaCategoria } from './componentes/categoria/lista-categoria/lista-categoria';
import { Prueba } from './paginas/admin/prueba/prueba';
import { ActualizacionCategoria } from './componentes/categoria/actualizacion-categoria/actualizacion-categoria';
import { RegistroCategoria } from './componentes/categoria/registro-categoria/registro-categoria';
import { Inicio } from './paginas/inicio/inicio';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion';
import { ActualizacionPlato } from './componentes/plato/actualizacion-plato/actualizacion-plato';
import { RegistroPlato } from './componentes/plato/registro-plato/registro-plato';
import { Promocion } from './paginas/promocion/promocion';
import { Contacto } from './paginas/contacto/contacto';
import { AuthGuard } from './guards/auth-guard';
import { Dashboard } from './paginas/admin/dashboard/dashboard';
import { Pruebasexternas } from './paginas/admin/pruebasexternas/pruebasexternas';
import { RegistroZona } from './componentes/zona/registro-zona/registro-zona';
import { ActualizacionMetodopago } from './componentes/metodopago/actualizacion-metodopago/actualizacion-metodopago';
import { RegistroMetodopago } from './componentes/metodopago/registro-metodopago/registro-metodopago';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: Inicio },
    { path: 'carta', component: ListaCategoria },
    {
        path: 'pruebas',
        component: Prueba,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    {
        path: 'pruebasexternas',
        component: Pruebasexternas,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    { path: 'promocion', component: Promocion },
    { path: 'contacto', component: Contacto },
    { 
        path: 'dashboard', 
        component: Dashboard ,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    { 
        path: 'actualizacion-categoria/:id', 
        component: ActualizacionCategoria,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },
    { 
        path: 'actualizacion-plato/:id', 
        component: ActualizacionPlato,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    {
        path: 'actualizacion-metodopago/:id',
        component: ActualizacionMetodopago,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    { 
        path: 'creacion-categoria', 
        component: RegistroCategoria,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },
    { 
        path: 'creacion-plato', 
        component: RegistroPlato,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },
    { 
        path: 'creacion-zona', 
        component: RegistroZona,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    {
        path: 'creacion-metodopago',
        component: RegistroMetodopago,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    { path: 'iniciar-sesion', component: IniciarSesionComponent },
];

RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled'
})