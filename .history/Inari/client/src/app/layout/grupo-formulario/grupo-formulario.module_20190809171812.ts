import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoFormularioComponent } from './grupo-formulario.component';

@NgModule({
  declarations: [
    GrupoFormularioComponent
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
,
    
  ]
})
export class GrupoFormularioModule { }
