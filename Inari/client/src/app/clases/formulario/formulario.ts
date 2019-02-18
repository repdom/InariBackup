import { Colaborador } from './colaborador';

export class FormularioModelo {
    // tslint:disable-next-line:no-inferrable-types
    public codigo: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    public nombre: string = '';
    // tslint:disable-next-line:no-inferrable-types
    public fechaCreacion: string = '';
    // tslint:disable-next-line:no-inferrable-types
    public cancelado: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    public areaCodigo: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    public usuarioRelacionado: number = 0;
    public items?: Item[] = [];
    constructor() { }
}

export class FormularioModeloItem {
    formularioModeloCodigo: number;
    itemCodigo: number;
    cancelado: number;
    id: number;

    constructor() { }
}

export class Item {
    // tslint:disable-next-line:no-inferrable-types
    codigo: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    nombre: string = '';
    // tslint:disable-next-line:no-inferrable-types
    fechaCreacion: string = '';
    // tslint:disable-next-line:no-inferrable-types
    cancelado: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    definicion: string = '';

    constructor() { }
}

export class Area {
    // tslint:disable-next-line:no-inferrable-types
    codigo: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    nombre: string = '';
    // tslint:disable-next-line:no-inferrable-types
    cancelado: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    foto: string[] = [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ];
    // tslint:disable-next-line:no-inferrable-types
    usuarioAdministradorArea: number = 0;
    administrador: Colaborador = new Colaborador();
}

export class FormularioItemModelo {
    formularioModelo: FormularioModelo = new FormularioModelo();
    items: Item[] = [];

    constructor() { }
}
