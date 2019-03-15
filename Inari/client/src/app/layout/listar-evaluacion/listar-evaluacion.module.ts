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
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    ItemEvaluacionService,
    EvaluacionService
  ]
})
export class ListarEvaluacionModule { }
