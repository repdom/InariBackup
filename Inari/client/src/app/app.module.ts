import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule  } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComunesModule } from './comunes/comunes.module';
import { HttpModule } from '@angular/http';
import { LoginService } from './services/usuario/login.service';
import { CookieService } from 'ngx-cookie-service';
import { AreaService } from './services/area/area.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FullScreenPropioDirective } from './full-screen-propio.directive';
import { registerLocaleData } from '@angular/common';
import LocaleEs from '@angular/common/locales/es-US';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

registerLocaleData(LocaleEs, 'es');

@NgModule({
    declarations: [AppComponent, FullScreenPropioDirective],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
        HttpModule,
        ComunesModule,
        MatProgressSpinnerModule,
        NgxSpinnerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        LoginService,
        CookieService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
