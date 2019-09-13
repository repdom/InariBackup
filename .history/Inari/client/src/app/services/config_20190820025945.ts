// import { RolMapping } from './../clases/formulario/colaborador';
import { RolService } from './rol/rol.service';
import { RolMappingService } from './rolMapping/rol-mapping.service';
import { CookieService } from 'ngx-cookie-service';

// {"where":{"fechaGuardado":{"between":["2019-08-15","2019-08-18"]}},"fields": {"codigo": true, "fechaGuardado": true, "usuarioRelacionado": true, "formularioModeloCodigo": true, "areaCodigo": true, "formularioModeloCodigo": true, "completado": true, "bloqueado":true, "hallazgo": true, "liberado":true},  "order": "fechaGuardado DESC"}
export class Config {
    public static host = 'http://localhost:3000/api';
    public static hostSocket = 'http://157.230.146.235:35009';
    // public static c: Config = null;
    private rolService: RolService;
    private rolMappingService: RolMappingService;
    private cookieService: CookieService;

    constructor() {}

    public rolUsuario(userId: number) {
        this.rolMappingService.getAllWhereCodigoRol(userId, 'principalId').subscribe(response => {
            console.log(response);
        }, (error) => {

        }, () => {

        });
        // this.rolService.getRelation()
    }
}
