import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario.component';
import { FormularioModeloService } from '../../services/formulario/formulario-modelo.service';
import { FormularioModeloItemService } from '../../services/formulario/formulario-modelo-item.service';
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
import { AreaService } from '../../services/area/area.service';
import { FormularioDialogComponent } from './formulario-dialog/formulario-dialog.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { ItemService } from '../../services/item/item.service';


@NgModule({
  declarations: [
    FormularioComponent,
    FormularioDialogComponent,
    ItemDialogComponent
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
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    FormularioModeloService,
    FormularioModeloItemService,
    AreaService,
    ItemService
  ], entryComponents: [
    FormularioDialogComponent
  ]
})
export class FormularioModule { }
