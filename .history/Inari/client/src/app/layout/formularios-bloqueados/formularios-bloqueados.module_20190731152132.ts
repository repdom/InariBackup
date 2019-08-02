import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulariosBloqueadosComponent } from './formularios-bloqueados.component';
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
import { NgxViewerModule } from 'ngx-viewer';
import { NgxPrintModule } from 'ngx-print';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import { ItemEvaluacionService } from 'src/app/services/evaluacion/item-evaluacion.service';
import { AreaService } from 'src/app/services/area/area.service';

@NgModule({
  declarations: [
    FormulariosBloqueadosComponent
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
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    AreaService,
    ItemEvaluacionService,
    EvaluacionService,
    ColaboradorService
  ]
})
export class FormulariosBloqueadosModule { }
