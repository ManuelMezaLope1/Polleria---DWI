import { Routes } from '@angular/router';
import { ListaCategoria } from './componentes/categoria/lista-categoria/lista-categoria';
import { Prueba } from './componentes/prueba/prueba';
import { ActualizacionCategoria } from './componentes/categoria/actualizacion-categoria/actualizacion-categoria';
import { RegistroCategoria } from './componentes/categoria/registro-categoria/registro-categoria';

export const routes: Routes = [
    {path: '', redirectTo:'categorias', pathMatch:'full'},
    {path: 'categorias', component: ListaCategoria},
    {path: 'pruebas', component: Prueba},

    { path: 'actualizacion-categoria/:id', component: ActualizacionCategoria },
    { path: 'creacion-categoria', component: RegistroCategoria }
];
