import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario.component';
import { MatInputModule } from '@angular/material/input';
import {
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTabsModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatIconModule,
  MatTreeModule,
  MatGridListModule,
  MatListModule,
  MatExpansionModule,
  MatSortModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import { AreaService } from '../../services/area/area.service';
import { CalendarioService } from 'src/app/services/calendario/calendario.service';
import { EvaluacionService } from 'src/app/services/evaluacion/evaluacion.service';

@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
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
    FormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    ColaboradorService,
    AreaService,
    CalendarioService,
    EvaluacionService
  ]
})
export class CalendarioModule { }
