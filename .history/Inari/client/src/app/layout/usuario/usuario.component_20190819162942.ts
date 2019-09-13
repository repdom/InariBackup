import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Colaborador, Rol, RolMapping } from '../../clases/formulario/colaborador';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { throwError } from 'rxjs';
import swal from 'sweetalert2';
import { RolService } from '../../services/rol/rol.service';
import { RolMappingService } from '../../services/rolMapping/rol-mapping.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  nuevoUsuario: Colaborador = new Colaborador;
  displayedColumns = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'usuario', 'rol', 'Acciones'];
  colaboradores: Colaborador[] = [];
  roles: Rol[] = [];
  dataSource: MatTableDataSource<Colaborador>;
  actualizar = false;
  rol: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private colaboradorService: ColaboradorService,
    private changeDetectorRefs: ChangeDetectorRef,
    private rolService: RolService,
    private rolMappingService: RolMappingService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.rol = this.cookieService.get('role');

    this.listarColaboradores();
    this.listarRoles();
  }

  listarRoles() {
    this.rolService.getAll().subscribe(rolResponse => {
      rolResponse.forEach(elementRol => {
        const rol = {
          id: elementRol['id'],
          name: elementRol['name'],
          description: elementRol['description'],
          // tslint:disable-next-line:no-inferrable-types
          created: elementRol['created'],
          // tslint:disable-next-line:no-inferrable-types
          modified: elementRol['modified'],
        };
        this.roles.push(rol);
      });
    });
  }

  listarColaboradores() {
        this.colaboradorService.getAll().subscribe(colaboradorResponse => {
          colaboradorResponse.forEach(elementColaborador => {
            if (elementColaborador['cancelado'] !== 1) {
              // tslint:disable-next-line:prefer-const
              let colaborador: Colaborador = {
                primerNombre: elementColaborador['primerNombre'],
                segundoNombre: elementColaborador['segundoNombre'],
                primerApellido: elementColaborador['primerApellido'],
                segundoApellido: elementColaborador['segundoApellido'],
                username: elementColaborador['username'],
                cedula: elementColaborador['cedula'],
                id: elementColaborador['id'],
                password: '',
              };
              // tslint:disable-next-line:prefer-const
              let roleMapping: RolMapping;
              this.rolMappingService.getAllWhereCodigoRol(colaborador.id, 'rol').subscribe(rolMappingResponse => {
                rolMappingResponse.forEach(elementRoleMapping => {
                  roleMapping = {
                    id: elementRoleMapping['id'],
                    principalType: elementRoleMapping['principalType'],
                    principalId: elementRoleMapping['principalId'],
                    roleId: elementRoleMapping['roleId'],
                  };
                  colaborador.RoleMapping = roleMapping;
                });
              }, error => {
                return throwError(error);
              }, () => {
                this.rolMappingService.getRelation(roleMapping.id, 'role').subscribe(roleResponse => {
                  const role: Rol = {
                    id: roleResponse['id'],
                    name: roleResponse['name'],
                    description: roleResponse['description'],
                    created: roleResponse['created'],
                    modified: roleResponse['modified'],
                  };
                  colaborador.Rol = role;
                }, error => {
                  throwError(error);
                }, () => {
                  this.colaboradores.push(colaborador);
                  this.dataSource = new MatTableDataSource(this.colaboradores);
                  this.changeDetectorRefs.detectChanges();
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                });
              });
            }
          });
        }, (error) => {
          throwError(error);
        }, () => {
          this.dataSource = new MatTableDataSource(this.colaboradores);
          this.changeDetectorRefs.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  }

  crearUsuario() {
    if (this.nuevoUsuario.cedula !== '' && this.nuevoUsuario.primerNombre !== ''
    && this.nuevoUsuario.primerApellido !== '' && this.nuevoUsuario.username !== '') {
      const nuevoUsuario = {
        primerNombre: this.nuevoUsuario.primerNombre,
        segundoNombre: this.nuevoUsuario.segundoNombre,
        primerApellido: this.nuevoUsuario.primerApellido,
        segundoApellido: this.nuevoUsuario.segundoApellido,
        username: this.nuevoUsuario.username,
        cedula: this.nuevoUsuario.cedula,
        email: this.nuevoUsuario.username + '@example.com',
        password: this.nuevoUsuario.password
      };

      const colaboradorAux = this.nuevoUsuario;

      const indice = this.colaboradores.push({
        primerNombre: colaboradorAux.primerNombre,
        segundoNombre: colaboradorAux.segundoNombre,
        primerApellido: colaboradorAux.primerApellido,
        segundoApellido: colaboradorAux.segundoApellido,
        username: colaboradorAux.username,
        cedula: colaboradorAux.cedula,
        id: 0,
        password: colaboradorAux.password,
        Rol: this.roles.filter(rol => rol.id === colaboradorAux.Rol.id)[0],
        RoleMapping: new RolMapping()
      });
      this.dataSource.data = [];
      this.dataSource.data = this.colaboradores;
      this.nuevoUsuario = new Colaborador();
      this.colaboradorService.create(nuevoUsuario).subscribe(colaboradorResponse => {
        this.colaboradores[indice - 1].id = colaboradorResponse['id'];
        const roleMap = {
          principalType: 'USER',
          principalId: colaboradorResponse['id'],
          roleId: this.colaboradores[indice - 1].Rol.id,
        };
        this.rolMappingService.create(roleMap).subscribe(responseRolMapping => {
          this.colaboradores[indice - 1].RoleMapping.id = responseRolMapping['id'];
          this.colaboradores[indice - 1].RoleMapping.principalType = responseRolMapping['principalType'];
          this.colaboradores[indice - 1].RoleMapping.principalId = responseRolMapping['principalId'];
          this.colaboradores[indice - 1].RoleMapping.roleId = responseRolMapping['roleId'];
        });
      }, error => {
        this.nuevoUsuario = colaboradorAux;
        this.colaboradores.pop();
        return throwError('Ha fallado el agregar un nuevo usuario, revisar conexión de internet');
      }, () => {
        swal.fire(
          'Usuario Agregado',
          '',
          'success',
        );
      });
    } else {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Debe de llenar obligatoriamente los campos: Primer Nombre, Primer Apellido, Cedula y Usuario',
      });
    }
  }
  actualiazarUsuario() {
    const nuevoUsuario = {
      id: this.nuevoUsuario.id,
      primerNombre: this.nuevoUsuario.primerNombre,
      segundoNombre: this.nuevoUsuario.segundoNombre,
      primerApellido: this.nuevoUsuario.primerApellido,
      segundoApellido: this.nuevoUsuario.segundoApellido,
      username: this.nuevoUsuario.username,
      cedula: this.nuevoUsuario.cedula,
      email: this.nuevoUsuario.username + '@prueba.com',
    };

    this.nuevoUsuario.Rol = this.roles.filter(rol => rol.id === this.nuevoUsuario.Rol.id)[0];

    this.colaboradorService.updateUser(nuevoUsuario).subscribe(updatedUserResponse => {
    }, (error) => {
      return throwError('Ha fallado el agregar un nuevo usuario, revisar conexión de internet');
    }, () => {
      const roleMapping = {
        id: this.nuevoUsuario.RoleMapping.id,
        principalType: 'USER',
        principalId: this.nuevoUsuario.id,
        roleId: this.nuevoUsuario.Rol.id,
      };
      this.rolMappingService.updateRoleMapping(roleMapping).subscribe(updateRoleMapping => {
        this.nuevoUsuario.RoleMapping.principalId = updateRoleMapping['principalId'];
        this.nuevoUsuario.RoleMapping.roleId = updateRoleMapping['roleId'];
      }, (error) => {
        return throwError('Ha fallado el agregar un nuevo usuario, revisar conexión de internet');
      }, () => {
        this.actualizar = false;
        this.nuevoUsuario = new Colaborador();
        swal.fire(
          'Usuario actualizado corectamente',
          '',
          'success',
        );
      });
    });
  }
  cancelar() {
    this.nuevoUsuario = new Colaborador();
    this.actualizar = false;
  }
  cargarUsuarioParaActualizar(colaborador: Colaborador) {
    this.nuevoUsuario = colaborador;
    this.actualizar = true;
  }
  eliminarCuenta(colaborador: Colaborador) {

    swal.fire({
      title: '¿Esta seguro?',
      text: '¡No va a poder deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        const user = {
          id: colaborador.id,
          cancelado: 1
        };
        this.colaboradorService.updateUser(user).subscribe(updatedUserResponse => {
        }, (error) => {
          return throwError('Ha fallado el agregar un nuevo usuario, revisar conexión de internet');
        }, () => {
          this.colaboradores.splice(this.colaboradores.findIndex(c => c.id === colaborador.id), 1);
          this.dataSource.data = [];
          this.dataSource.data = this.colaboradores;
          swal.fire(
            '!Eliminado con exito¡',
            'El colaborador ha sido eliminado.',
            'success'
          );
        });
      }
    });
  }
}

