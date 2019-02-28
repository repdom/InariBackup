export class Colaborador {
    // tslint:disable-next-line:no-inferrable-types
    public primerNombre: string = '';
    // tslint:disable-next-line:no-inferrable-types
    public segundoNombre: string = '';
    // tslint:disable-next-line:no-inferrable-types
    public primerApellido: string = '';
    // tslint:disable-next-line:no-inferrable-types
    public segundoApellido: string = '';
    // tslint:disable-next-line:no-inferrable-types
    public username: string = '';
    // tslint:disable-next-line:no-inferrable-types
    public cedula: string = '';
    // tslint:disable-next-line:no-inferrable-types
    public password: string = '';
    public id: 0;
    public Rol?: Rol = new Rol();
    public RoleMapping?: RolMapping = new RolMapping();
    constructor() { }
}

export class Rol {
    // tslint:disable-next-line:no-inferrable-types
    id: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    name: string = '';
    // tslint:disable-next-line:no-inferrable-types
    description: string = '';
    // tslint:disable-next-line:no-inferrable-types
    created: string = '';
    // tslint:disable-next-line:no-inferrable-types
    modified: string = '';
}

export class RolMapping {
    // tslint:disable-next-line:no-inferrable-types
    id: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    principalType: string = '';
    // tslint:disable-next-line:no-inferrable-types
    principalId: string = '';
    // tslint:disable-next-line:no-inferrable-types
    roleId: number = 0;
}

export class FormularioArea {
    // tslint:disable-next-line:no-inferrable-types
    cancelado: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    id: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    area: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    formularioModelo: number = 0;
}
