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
import { ColaMensajeriaComponent } from './cola-mensajeria.component';
import { ColaMensajeriaService } from 'src/app/services/cola-mensajeria/cola-mensajeria.service';

@NgModule({
  declarations: [ColaMensajeriaComponent],
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
    ColaMensajeriaService
  ]
})
export class ColaMensajeriaModule { }
