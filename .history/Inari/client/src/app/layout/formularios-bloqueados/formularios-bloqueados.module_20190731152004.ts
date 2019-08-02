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

@NgModule({
  declarations: [FormulariosBloqueadosComponent],
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
  ]
})
export class FormulariosBloqueadosModule { }
