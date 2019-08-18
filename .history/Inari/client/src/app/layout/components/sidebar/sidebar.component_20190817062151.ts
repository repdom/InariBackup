import { Component, OnInit, OnChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
    public showMenu: string;
    constructor(private cookieService: CookieService) {}

    ngOnInit() {
        this.showMenu = '';
    }

    ngOnChanges() {
        this.
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
