import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
    public showMenu: string;
    public rol: string;

    constructor(private cookieService: CookieService) {}

    ngOnInit() {
        this.showMenu = '';
        console.log(this.cookieService.get('role'));
        this.rol = this.cookieService.get('role');
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
