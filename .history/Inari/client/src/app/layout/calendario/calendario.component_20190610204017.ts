import { Component, OnInit, ViewChild, ChangeDetectorRef, LOCALE_ID } from '@angular/core';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import { AreaService } from '../../services/area/area.service';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Colaborador, RolMapping, Rol } from 'src/app/clases/formulario/colaborador';
import { RolMappingService } from '../../services/rolMapping/rol-mapping.service';
import { throwError } from 'rxjs';
import { Area } from 'src/app/clases/formulario/formulario';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { formatDate, registerLocaleData } from '@angular/common';
import swal from 'sweetalert2';
import localePy from '@angular/common/locales/es-PY';


export class AreaView {
  nombre = '';
}
export class Calendario {
  codigo = 0;
  inicioCalendario: Date = new Date();
  finCalendario: Date = new Date();
  areaCodigo = 0;
  cancelado = 0;
  usuarioRelacionado = 0;
  area?: AreaView;
  usuario?: Colaborador;
  constructor() { }
}
registerLocaleData(localePy, 'es');

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
})
export class CalendarioComponent implements OnInit {
  listaColaboradores: Colaborador[] = [];
  areas: Area[] = [];
  nuevoCalendario: Calendario = new Calendario();
  actualizar = false;
  calendarios: Calendario[] = [];
  fechaActual: Date = new Date(Date.now());
  displayedColumns = ['inicioCalendario', 'finCalendario', 'area', 'usuarioRelacionado', 'acciones'];
  dataSource: MatTableDataSource<Calendario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private colaboradoresService: ColaboradorService, private areaService: AreaService,
              private calendarioService: CalendarioService, private spinner: NgxSpinnerService,
              private rolMappingService: RolMappingService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.listarColaborador();
    this.listarAreas();
    this.listarCalendario();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // listar colaboradores dentro del sistema
  listarColaborador() {
    this.spinner.show();
    this.colaboradoresService.getAll().subscribe(colaboradoresResponse => {
      colaboradoresResponse.forEach(elementColaboradores => {
        if (elementColaboradores['cancelado'] === 0) {
          const colaborador: Colaborador = {
            primerNombre: elementColaboradores['primerNombre'],
            segundoNombre: elementColaboradores['segundoNombre'],
            primerApellido: elementColaboradores['primerApellido'],
            segundoApellido: elementColaboradores['segundoApellido'],
            username: elementColaboradores['username'],
            cedula: elementColaboradores['cedula'],
            id: elementColaboradores['id'],
            password: ''
          };
          let roleMapping = new RolMapping();
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
            }, (error) => {
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
              }, (error) => {
                return throwError(error);
              }, () => {
                if (colaborador.Rol.name === 'Verificador') {
                  this.listaColaboradores.push(colaborador);
                }
              });
            });
          }
        });
    }, (error) => {
      return throwError(error);
    }, () => {
      this.spinner.hide();
    });
  }
  // listar areas a evaluar
  listarAreas() {
    this.spinner.show();
    this.areaService.getFilterByAttributeOrderByName().subscribe(areaResponse => {
      // console.log(areaResponse);
      areaResponse.forEach(areaElement => {
          // tslint:disable-next-line:prefer-const
          let area: Area = new Area();
          area.nombre = areaElement['nombre'];
          area.cancelado = areaElement['cancelado'];
          area.codigo = areaElement['codigo'];
          this.areas.push(area);
          // console.log(areaElement);
          // this.dataSource = new MatTableDataSource(this.areas);
          // this.changeDetectorRefs.detectChanges();
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
      });
    }, (error) => {
      this.spinner.hide();
      return throwError('Ha ocurrido un problema, revise conexión a internet');
    }, () => {
      // this.dataSource = new MatTableDataSource(this.areas);
      // this.changeDetectorRefs.detectChanges();
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      // this.spinner.hide();
    });
  }
  listarCalendario() {
    this.spinner.show();
    this.calendarioService.getProgramacionActiva().subscribe(calendarioResponse => {
      console.log(calendarioResponse);
      // let calendario: Calendario;
      calendarioResponse.forEach(elementCalendario => {
        const fechaFinalCalendario = new Date(elementCalendario['finCalendario']);
        // console.log(elementCalendario);
        if (elementCalendario['cancelado'] === 0
            && elementCalendario['usuario_relacionado'] > 0) {
          const calendario: Calendario = {
            codigo: elementCalendario['codigo'],
            inicioCalendario: elementCalendario['inicio_calendario'],
            finCalendario: elementCalendario['fin_calendario'],
            areaCodigo: elementCalendario['area_codigo'],
            cancelado: elementCalendario['cancelado'],
            usuarioRelacionado: elementCalendario['usuario_relacionado'],
          };
          // console.log(calendario);
          this.colaboradoresService.getFromCode(calendario.usuarioRelacionado).subscribe(responseCalendario => {
            const colaboradorCalendario: Colaborador = {
                primerNombre: responseCalendario['primerNombre'],
                segundoNombre: responseCalendario['segundoNombre'],
                primerApellido: responseCalendario['primerApellido'],
                segundoApellido: responseCalendario['segundoApellido'],
                username: responseCalendario['username'],
                cedula: responseCalendario['cedula'],
                password: responseCalendario['password'],
                id: responseCalendario['id'],
            };
            calendario.usuario = colaboradorCalendario;
          }, (error) => {
            swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Hubo un error en la carga de datos: revise conexión a internet',
            });
          }, () => {
            // console.log(calendario);
            this.areaService.getFromCodeLimited(calendario.areaCodigo).subscribe(calendarioAreaResponse => {
              console.log(calendarioAreaResponse);
              const areaView: AreaView = {
                nombre: calendarioAreaResponse['nombre']
              };
              calendario.area = areaView;
            }, (error) => {
              swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Hubo un error en la carga de datos: revise conexión a internet',
              });
            }, () => {
              console.log(calendario);
              this.calendarios.push(calendario);
              this.dataSource = new MatTableDataSource(this.calendarios);
              this.changeDetectorRefs.detectChanges();
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              // this.spinner.hide();
            });
          });
        }
      });
    }, (error) => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Hubo un error en la carga de datos: revise conexión a internet',
      });
    }, () => {
      this.spinner.hide();
    });
  }
  agregarCalendario() {
    this.spinner.show();
    const calendario = {
      codigo: 0,
      inicioCalendario: this.nuevoCalendario.inicioCalendario,
      finCalendario: this.nuevoCalendario.finCalendario,
      areaCodigo: this.nuevoCalendario.areaCodigo,
      cancelado: 0,
      usuarioRelacionado: this.nuevoCalendario.usuarioRelacionado,
    };
    const calendarioAux = this.nuevoCalendario;
    const indice = this.calendarios.push({
      codigo: 0,
      inicioCalendario: this.nuevoCalendario.inicioCalendario,
      finCalendario: this.nuevoCalendario.finCalendario,
      areaCodigo: this.nuevoCalendario.areaCodigo,
      cancelado: 0,
      usuarioRelacionado: this.nuevoCalendario.usuarioRelacionado,
      usuario: this.listaColaboradores.find(c => c.id === calendarioAux.usuarioRelacionado),
      area: this.areas.find(a => a.codigo === calendarioAux.areaCodigo)
    });
    this.nuevoCalendario = new Calendario();
    this.calendarioService.create(calendario).subscribe(calendarioResponse => {
      this.calendarios[indice - 1].codigo = calendarioResponse['codigo'];
    }, (error) => {
      this.nuevoCalendario = calendarioAux;
      this.calendarios.pop();
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Debe de elegir obligatoriamente los campos: Fecha de Inicio, Fecha de Finalización, Área y Evaluador',
      });
    }, () => {
      this.calendarios.push(calendario);
      // this.dataSource = new MatTableDataSource(this.calendarios);
      this.dataSource.data = this.calendarios;
      this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      swal.fire(
        'Programación agregada',
        '',
        'success',
      );
      this.spinner.hide();
    });
  }
  cargarActualizacion(calendarioCargar: Calendario) {
    this.actualizar = true;
    this.nuevoCalendario = calendarioCargar;
  }
  actualizarCalendario() {
    const calendario = {
      codigo: this.nuevoCalendario.codigo,
      inicioCalendario: this.nuevoCalendario.inicioCalendario,
      finCalendario: this.nuevoCalendario.finCalendario,
      areaCodigo: this.nuevoCalendario.areaCodigo,
      usuarioRelacionado: this.nuevoCalendario.usuarioRelacionado,
    };
    const indice = this.calendarios.findIndex(c => c.codigo === this.nuevoCalendario.codigo);
    this.calendarioService.update(calendario).subscribe(calendarioResponse => {
      this.calendarios[indice].inicioCalendario = calendarioResponse['inicioCalendario'];
      this.calendarios[indice].finCalendario = calendarioResponse['finCalendario'];
      this.calendarios[indice].areaCodigo = calendarioResponse['areaCodigo'];
      this.calendarios[indice].usuarioRelacionado = calendarioResponse['usuarioRelacionado'];
    }, (error) => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Hubo un error en la actualización del calendario. Recuerde llenar todos los campos',
      });
    }, () => {
      this.calendarios[indice].area = {
        nombre: this.areas.find(a => a.codigo === this.calendarios[indice].areaCodigo).nombre
      };
      this.calendarios[indice].usuario = this.listaColaboradores.find(c => c.id === this.calendarios[indice].usuarioRelacionado);
      this.nuevoCalendario = new Calendario();
      this.dataSource.data = this.calendarios;
      this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.actualizar = false;
      swal.fire(
        'Programación actualizada',
        '',
        'success',
      );
    });
  }
  cancelar() {
    this.nuevoCalendario = new Calendario();
    if (this.actualizar === true) {
      this.actualizar = false;
    }
  }
  eliminarCalendario(calendarioCargar: Calendario) {
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
        const calendarioActualizada = {
          codigo: calendarioCargar.codigo,
          cancelado: 1
        };
        this.calendarioService.update(calendarioActualizada).subscribe(updatedUserResponse => {
        }, (error) => {
          return throwError('Ha fallado el eliminar el programa, revisar conexión de internet');
        }, () => {
          this.calendarios.splice(this.calendarios.findIndex(c => c.codigo === calendarioCargar.codigo), 1);
          this.dataSource.data = [];
          this.dataSource.data = this.calendarios;
          swal.fire(
            '!Eliminado con exito¡',
            'La programación ha sido eliminada con exito.',
            'success'
          );
        });
      }
    });
  }
}
