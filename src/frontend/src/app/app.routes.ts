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
import { Cuenta } from './paginas/usuario/cuenta/cuenta';
import { RegistroOferta } from './componentes/oferta/registro-oferta/registro-oferta';
import { ActualizacionOferta } from './componentes/oferta/actualizacion-oferta/actualizacion-oferta';
import { Carro } from './paginas/usuario/carro/carro';
import { Mensaje } from './paginas/admin/mensaje/mensaje';
import { RegistroIngrediente } from './componentes/ingrediente/registro-ingrediente/registro-ingrediente';
import { ActualizacionIngrediente } from './componentes/ingrediente/actualizacion-ingrediente/actualizacion-ingrediente';
import { ActualizacionAlergia } from './componentes/alergia/actualizacion-alergia/actualizacion-alergia';
import { RegistroAlergia } from './componentes/alergia/registro-alergia/registro-alergia';
import { Chatbot } from './componentes/chatbot/chatbot';
import { Sistema } from './paginas/admin/sistema/sistema';
import { ActualizacionRol } from './componentes/rol/actualizacion-rol/actualizacion-rol';
import { RegistroRol } from './componentes/rol/registro-rol/registro-rol';
import { ActualizacionZona } from './componentes/zona/actualizacion-zona/actualizacion-zona';
import { Ingrediente } from './paginas/admin/ingrediente/ingrediente';
import { ActualizacionUsuario } from './componentes/usuario/actualizacion-usuario/actualizacion-usuario';
import { DashboardCocinero } from './paginas/cocinero/dashboard-cocinero/dashboard-cocinero';
import { ActualizacionCategoriaIngrediente } from './componentes/categoriaingrediente/actualizacion-categoria-ingrediente/actualizacion-categoria-ingrediente';
import { RegistroCategoriaIngrediente } from './componentes/categoriaingrediente/registro-categoria-ingrediente/registro-categoria-ingrediente';
import { Ingredienteplatos } from './paginas/admin/ingredienteplatos/ingredienteplatos';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: Inicio },
    { path: 'carta', component: ListaCategoria },
    { path: 'chatbot', component: Chatbot },

    {
        path: 'cuenta',
        component: Cuenta,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN','ROLE_COCINERO'] }
    },

    {
        path: 'carro/:tipo/:id',
        component: Carro,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN','ROLE_COCINERO']}
    },

    {
        path: 'platos',
        component: Prueba,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    {
        path: 'ingredientes',
        component: Ingrediente,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        path: 'usuarios',
        component: Pruebasexternas,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    {
        path: 'mensajes',
        component: Mensaje,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    {
        path: 'sistema',
        component: Sistema,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        path: 'unir-ingrediente-platos',
        component: Ingredienteplatos,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
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
        path: 'actualizacion-usuario/:id', 
        component: ActualizacionUsuario,
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
        path: 'actualizacion-zona/:id',
        component: ActualizacionZona,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        path: 'actualizacion-metodopago/:id',
        component: ActualizacionMetodopago,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    {
        path: 'actualizacion-oferta/:id',
        component: ActualizacionOferta,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    {
        path: 'actualizacion-ingrediente/:id',
        component: ActualizacionIngrediente,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        path: 'actualizacion-alergia/:id',
        component: ActualizacionAlergia,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        path: 'actualizacion-rol/:id',
        component: ActualizacionRol,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    { 
        path: 'actualizacion-categoria-ingrediente/:id', 
        component: ActualizacionCategoriaIngrediente,
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

    {
        path: 'creacion-oferta',
        component: RegistroOferta,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN']}
    },

    {
        path: 'creacion-ingrediente',
        component: RegistroIngrediente,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        path: 'creacion-alergia',
        component: RegistroAlergia,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        path: 'creacion-rol',
        component: RegistroRol,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        path: 'creacion-categoria-ingrediente',
        component: RegistroCategoriaIngrediente,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    { path: 'iniciar-sesion', component: IniciarSesionComponent },

    { path: 'dashboard-cocinero', component: DashboardCocinero, canActivate: [AuthGuard], data: { roles: ['ROLE_COCINERO'] } }
];

RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled'
})