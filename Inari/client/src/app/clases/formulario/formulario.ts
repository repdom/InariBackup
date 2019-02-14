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
    codigo: number;
    nombre: string;
    fechaCreacion: string;
    cancelado: number;

    constructor() { }
}

export class Area {
    codigo: number;
    nombre: string;
    cancelado: number;
}

export class FormularioItemModelo {
    formularioModelo: FormularioModelo = new FormularioModelo();
    items: Item[] = [];

    constructor() { }
}
