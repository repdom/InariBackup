import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/usuario/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public txtUsuario: string;
    public txtContrasena: string;
    public user: any;

    constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) {}

    ngOnInit() {
        if (this.cookieService.check('userid') && this.cookieService.check('access_token')) {
            this.router.navigate(['/dashboard']);
          }
    }

    onLogin() {
        this.loginService.login({ username: this.txtUsuario, password: this.txtContrasena }).subscribe(resp => {
            this.user = {
              tokenId: resp.id,
              id: resp.userId,
            };

            this.cookieService.set('access_token', resp.id, 1);
            this.cookieService.set('userid', resp.userId, 1);

            console.log(resp);

            this.router.navigate(['/dashboard']);
          });
    }
}
