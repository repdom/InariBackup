import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
    ],
    providers: [
        CookieService
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
