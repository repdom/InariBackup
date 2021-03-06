import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ItemService } from '../../services/item/item.service';
import { GruposService } from 'src/app/services/grupos/grupos.service';
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
  ],
  providers: [
    GruposService
  ]
})
export class GrupoFormularioModule { }
