import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AreaComponent } from './area/area.component';
import { ItemComponent } from './item/item.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ListarEvaluacionComponent } from './listar-evaluacion/listar-evaluacion.component';
import { FormulariosBloqueadosComponent } from './formularios-bloqueados/formularios-bloqueados.component';
import { ItemEspecialesComponent } from '../../../../../.history/Inari/client/src/app/layout/item-especiales/item-especiales.component_20190809153804';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'formulario',
                component: FormularioComponent
            },
            {
                path: 'areas',
                component: AreaComponent
            },
            {
                path: 'items',
                component: ItemComponent
            },
            {
                path: 'usuarios',
                component: UsuarioComponent
            },
            {
                path: 'calendario',
                component: CalendarioComponent
            },
            {
                path: 'evaluaciones',
                component: ListarEvaluacionComponent
            },
            {
                path: 'formularios-bloqueados',
                component: FormulariosBloqueadosComponent
            },
            {
                path: 'formularios-bloqueados',
                component: ItemEspecialesComponent
            }
            /*{
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            },
            {
                path: 'components',
                loadChildren:
                    './material-components/material-components.module#MaterialComponentsModule'
            },
            {
                path: 'forms',
                loadChildren: './forms/forms.module#FormsModule'
            },
            {
                path: 'grid',
                loadChildren: './grid/grid.module#GridModule'
            },
            {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            },
            {
                path: 'blank-page',
                loadChildren: './blank-page/blank-page.module#BlankPageModule'
            }*/
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
