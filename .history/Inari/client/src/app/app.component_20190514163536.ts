import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cargando } from './clases/cargandoFile';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private translate: TranslateService, private router: Router, private cookieService: CookieService) {
        // translate.setDefaultLang('en');
    }

    ngOnInit() {
        if (!this.cookieService.check('userid') && !this.cookieService.check('access_token')) {
            this.router.navigate(['/login']);
        }
    }
}
