import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulariosBloqueadosComponent } from './formularios-bloqueados.component';

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
