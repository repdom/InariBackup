// import { RolMapping } from './../clases/formulario/colaborador';
import { RolService } from './rol/rol.service';
import { RolMappingService } from './rolMapping/rol-mapping.service';
import { CookieService } from 'ngx-cookie-service';

export class Config {
    public static host = 'https://arturobisonoabt.tk/api';
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
