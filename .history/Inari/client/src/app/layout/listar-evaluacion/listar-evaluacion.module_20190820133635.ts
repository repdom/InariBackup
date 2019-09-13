import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarEvaluacionComponent } from './listar-evaluacion.component';
import { MatInputModule,
         MatCheckboxModule,
         MatButtonModule,
         MatTabsModule,
         MatCardModule,
         MatTableModule,
         MatPaginatorModule,
         MatDialogModule,
         MatButtonToggleModule,
         MatIconModule,
         MatTreeModule,
         MatGridListModule,
         MatListModule,
         MatExpansionModule,
         MatSortModule,
         MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ItemEvaluacionService } from '../../services/evaluacion/item-evaluacion.service';
import { EvaluacionService } from '../../services/evaluacion/evaluacion.service';
import { NgxViewerModule } from 'ngx-viewer';
import { ColaboradorService } from 'src/app/services/usuario/colaborador.service';
import { AreaService } from '../../services/area/area.service';
import {NgxPrintModule} from 'ngx-print';
import { BloqueadosService } from '../../services/bloqueados/bloqueados.service';
import { ItemEspecialesService } from 'src/app/services/itemEspeciales/item-especiales.service';


@NgModule({
  declarations: [
    ListarEvaluacionComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    FlexLayoutModule,
    HttpModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTreeModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatSortModule,
    MatSelectModule,
    NgxViewerModule,
    NgxPrintModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    AreaService,
    ItemEvaluacionService,
    EvaluacionService,
    ColaboradorService,
    BloqueadosService,
    ItemEspecialesService
  ]
})
export class ListarEvaluacionModule { }
