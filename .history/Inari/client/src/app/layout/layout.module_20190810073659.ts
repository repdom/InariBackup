import { CalendarioModule } from './calendario/calendario.module';
import { FormularioModule } from './formulario/formulario.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { AreaModule } from './area/area.module';
import { ItemModule } from './item/item.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ComunesModule } from '../comunes/comunes.module';
import { ListarEvaluacionModule } from './listar-evaluacion/listar-evaluacion.module';
import { ColaboradorService } from '../services/usuario/colaborador.service';
import { ItemEvaluacionService } from '../services/evaluacion/item-evaluacion.service';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import { AreaService } from '../services/area/area.service';
import { FormularioModeloService } from '../services/formulario/formulario-modelo.service';
import { ItemService } from '../services/item/item.service';
import {NgxImageCompressService} from 'ngx-image-compress';
import { FormulariosBloqueadosModule } from './formularios-bloqueados/formularios-bloqueados.module';
import { ItemEspecialesComponent } from './item-especiales/item-especiales.component';
import { ItemEspecialesModule } from './item-especiales/item-especiales.module';
import { GrupoFormularioComponent } from './grupo-formulario/grupo-formulario.component';
import { GrupoFormularioModule } from './grupo-formulario/grupo-formulario.module';
import { FormulariosLiberadosModule } from './formularios-liberados/formularios-liberados.module';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        TranslateModule,
        FormularioModule,
        AreaModule,
        ItemModule,
        UsuarioModule,
        ComunesModule,
        CalendarioModule,
        ListarEvaluacionModule,
        FormulariosBloqueadosModule,
        ItemEspecialesModule,
        GrupoFormularioModule,
        FormulariosLiberadosModule,
        ColaMensajeriaMo
    ],
    providers: [
        NgxImageCompressService
    ],
    declarations: [LayoutComponent, NavComponent, TopnavComponent, SidebarComponent]
})
export class LayoutModule {}
