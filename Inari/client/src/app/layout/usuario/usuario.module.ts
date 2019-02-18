import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaService } from 'src/app/services/area/area.service';
import {
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
  MatSortModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario.component';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import { RolService } from '../../services/rol/rol.service';
import { RolMappingService } from '../../services/rolMapping/rol-mapping.service';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [UsuarioComponent],
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
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ], providers: [
    ColaboradorService,
    RolService,
    RolMappingService
  ]
})
export class UsuarioModule { }
