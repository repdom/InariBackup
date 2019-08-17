import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
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

@NgModule({
  declarations: [ColaMensajeriaComponent],
  imports: [
    CommonModule
  ]
})
export class ColaMensajeriaModule { }
