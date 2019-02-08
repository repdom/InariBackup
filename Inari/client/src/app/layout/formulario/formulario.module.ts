import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario.component';
import { FormularioModeloService } from '../../../services/formulario/formulario-modelo.service';
import { FormularioModeloItemService } from '../../../services/formulario/formulario-modelo-item.service';
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
        MatSortModule
      } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AreaService } from 'src/services/area/area.service';


@NgModule({
  declarations: [
    FormularioComponent
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
  ],
  providers: [
    FormularioModeloService,
    FormularioModeloItemService,
    AreaService
  ]
})
export class FormularioModule { }
