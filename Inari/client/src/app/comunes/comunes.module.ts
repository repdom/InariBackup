import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppErrorHandler } from './app-error-handler';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialComponentsModule } from '../layout/material-components/material-components.module';
import { DialogOverviewComponent } from '../layout/material-components/dialog-overview/dialog-overview.component';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MaterialComponentsModule
  ],
  declarations: [],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  entryComponents: [
    DialogOverviewComponent,
  ]
})
export class ComunesModule { }
