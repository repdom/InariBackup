export class FormularioModulo {
    public codigo: number;
    public nombre: string;
    public fechaCreacion: string;
    public cancelado: number;
    public areaCodigo: number;
    public usuarioRelacionado: number;

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
