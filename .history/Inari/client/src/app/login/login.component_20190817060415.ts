import { Config } from './../services/config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/usuario/login.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { RolMappingService } from '../services/rolMapping/rol-mapping.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public txtUsuario: string;
    public txtContrasena: string;
    public user: any;

    constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService,
                private spinner: NgxSpinnerService, private roleMappingService: RolMappingService
      ) {}

    ngOnInit() {
        if (this.cookieService.check('userid') && this.cookieService.check('access_token')) {
            this.router.navigate(['/dashboard']);
          }
    }

    onLogin() {
        this.spinner.show();
        this.loginService.login({ username: this.txtUsuario, password: this.txtContrasena }).subscribe(resp => {
            this.user = {
              tokenId: resp.id,
              id: resp.userId,
            };
            this.cookieService.set('access_token', resp.id, 1);
            this.cookieService.set('userid', resp.userId, 1);
            // this.cookieService.set('rolId')
            // const config: Config =  new Config();
            console.log(resp);
          }, (error) => {
            swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Contraseña y/o usuario no reconocido',
            });
            this.spinner.hide();
          }, () => {
            this.roleMappingService.getAllWhereCodigoRol(this.user.id, '').subscribe(respLogin => {
              console.log(respLogin);
              respLogin.forEach(e => {
                this.roleMappingService.getAllRelationRol(id.id).subscribe(getRoleByCode => {
                  this.cookieService.set('role', getRoleByCode.name);
                  this.router.navigate(['/dashboard']);
                }, (error) => {
                  swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Contraseña y/o usuario no reconocido',
                  });
                  this.spinner.hide();
                }, () => {
                  this.spinner.hide();
                });
              });
            }, (error) => {
            }, () => {});
          });
    }
}
