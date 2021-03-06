import { Component, OnInit, ViewChild, ChangeDetectorRef, EventEmitter, AfterViewInit, ApplicationRef } from '@angular/core';
import { EvaluacionService } from '../../services/evaluacion/evaluacion.service';
import { ItemEvaluacionService } from 'src/app/services/evaluacion/item-evaluacion.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, PageEvent } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Area, FormularioModelo } from '../../clases/formulario/formulario';
import { throwError } from 'rxjs';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import { Colaborador, RolMapping, Rol } from '../../clases/formulario/colaborador';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { AreaService } from '../../services/area/area.service';
import swal from 'sweetalert2';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { ItemEspecialesEvaluacion, HistorialDeFormulario } from '../formularios-bloqueados/formularios-bloqueados.component';
import { RolMappingService } from 'src/app/services/rolMapping/rol-mapping.service';
// http-server -c-1 -P http://localhost:9000 .

export class ItemEvaluacion {
  codigo = 0;
  fechaCreacion = '';
  fechaGuardado = '';
  fechaGuardadoCompleta = '';
  evaluacion = 0;
  comentario = '';
  formularioEvaluacionCodigo = 0;
  imagen = '';
  imagen2 = '';
  usuarioRelacionado = 0;
  itemCodigo = 0;
  itemNombre = '';
  definicion = '';
}

export class Evaluacion {
  codigo = 0;
  fechaCreacion = '';
  fechaGuardado = '';
  usuarioRelacionado = 0;
  formularioModeloCodigo = 0;
  formulario?: FormularioModelo = new FormularioModelo();
  formularioNombre = '';
  areaCodigo = 0;
  area: Area = new Area();
  administradorDeArea = '';
  areaNombre = '';
  nombreEvaluador = '';
  completado?: boolean = false;
  bloqueado?: boolean = false;
  liberado?: boolean = true;
  hallazgos?: boolean = false;
  evaluador: Colaborador;
  foto = ['', '', '', '', '', '', '', '', '', ''];
  itemsEvaluados: ItemEvaluacion[] = [];
  fechaCompletaCreacion = '';
  fechaCompletaGuardado = '';
  itemEspeciales?: ItemEspecialesEvaluacion[] = [];
  historial?: HistorialDeFormulario [] = [];
  emailDesbloqueoEnviado?: boolean;
}

export class Imagen {
  fotoArea: string;
  fotoFormulario: string;

  constructor(fotoArea: string, fotoFormulario: string) {
    this.fotoArea = fotoArea;
    this.fotoFormulario = fotoFormulario;
  }
}

@Component({
  selector: 'app-listar-evaluacion',
  templateUrl: './listar-evaluacion.component.html',
  styleUrls: ['./listar-evaluacion.component.scss']
})
export class ListarEvaluacionComponent implements OnInit, AfterViewInit {
  evaluacionColumns = ['formularioNombre',
                        'fechaCompletaCreacion',
                        'fechaCompletaGuardado',
                        'areaNombre',
                        'administradorDeArea',
                        'nombreEvaluador',
                        'acciones'
                      ];
  evaluacionVistaColumns = ['item',
                            'definicion',
                            'evaluacion',
                            'comentario',
                            'imagen'
                          ];
  evaluacionImagenesArea = ['imagenArea', 'imagenFormulario'];
  dataSource: MatTableDataSource<Evaluacion>;
  dataSourceEvaluacion: MatTableDataSource<ItemEvaluacion>;
  dataSourceImagenes: MatTableDataSource<Imagen>;
  iterable: number [] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  listaEvaluacion: Evaluacion[] = [];
  evaluacion: Evaluacion =  new Evaluacion();
  public viewerOptions: any = {
    navbar: true,
    toolbar: {
      navbar: 0,
      zoomIn: 4,
      zoomOut: 4,
      oneToOne: 4,
      reset: 4,
      prev: 0,
      play: {
        show: 0,
        size: 'large',
      },
      next: 0,
      rotateLeft: 1,
      rotateRight: 1,
      flipHorizontal: 4,
      flipVertical: 4,
    }
  };
  public viewerOptions2: any = {
    navbar: true,
    toolbar: {
      navbar: 0,
      zoomIn: 4,
      zoomOut: 4,
      oneToOne: 4,
      reset: 4,
      prev: 4,
      play: {
        show: 0,
        size: 'large',
      },
      next: 4,
      rotateLeft: 1,
      rotateRight: 1,
      flipHorizontal: 4,
      flipVertical: 4,
    }
  };
  images = ['http://abt.com.do/wp-content/themes/abt/images/logo.jpg'];
  seActivo = false;
  cantidadEvaluaciones: number;
  tamPaginas: number [] = [5, 10, 20];
  tamPagina =  5;
  indicePagina = 0;
  acumuladorPagina = 0;
  tamAnterior = 0;
  public rol: string;
  filtrosWhere;
  filtrosBetween: any = [];
  areas: Area[] = [];
  nombreColor: string = '';
  fechaActual: Date = new Date(Date.now());
  fechaFiltroInicio: Date;
  fechaFiltroFin: Date;
  codigoArea: number = 0;
  cargandoCuestion: boolean = false;
  opcionFiltroSemaforo = {
    hallazgos: 0,
    bloqueado: 0,
    liberado: 0
  };
  filtrando: boolean = false;
  filtrosWhereAny = {
    fechaGuardado: {},
    and: []
  };
  filtrosWhereConBetweenAny = {
    between: [],
    and: []
  };
  listaColaboradores: Colaborador[] = [];
  colaboradorCodigo = 0;
  administradorAreaCodigo = 0;


  @ViewChild('tableEvaluacionPaginator') paginatorEvaluacion: MatPaginator;
  @ViewChild('tableSortEvaluacionSort') sortEvaluacion: MatSort;

  @ViewChild('tablePaginatorVistaFormularioEvaluacion') paginatorVistaEvaluacion: MatPaginator;
  @ViewChild('tableSortVistaFormularioEvaluado') sortVistaEvaluacion: MatSort;
  // onPageSwitch = new EventEmitter();

  constructor(private evaluacionService: EvaluacionService,
              private itemEvaluacionService: ItemEvaluacionService,
              private colaboradoresService: ColaboradorService,
              private areaService: AreaService,
              public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              private cookieService: CookieService,
              private spinner: NgxSpinnerService,
              public _DomSanitizer: DomSanitizer,
              public swUpdate: SwUpdate,
              public appRef: ApplicationRef,
              private rolMappingService: RolMappingService) { }

  ngOnInit() {
    this.rol = this.cookieService.get('role');
    this.listarAreas();
    setTimeout(t => {
      this.cargarCantidad();
    }, 1000);
    this.listarEvaluaciones();
    this.listarColaboradoresActivos();
    // this.cargarCantidad();
    // this._DomSanitizer.bypassSecurityTrustResourceUrl()
    // this._DomSanitizer.bypassSecurityTrustHtml('http://abt.com.do/wp-content/themes/abt/images/logo.jpg')
  }

  listarColaboradoresActivos() {
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
                  this.listaColaboradores.push(colaborador);
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

  listarAreas() {
    // this.spinner.show();
    this.areaService.getFilterByAttributeOrderByName().subscribe(areaResponse => {
      // console.log(areaResponse);
      areaResponse.forEach(areaElement => {
          let area: Area = new Area();
          area.nombre = areaElement['nombre'];
          area.cancelado = areaElement['cancelado'];
          area.codigo = areaElement['codigo'];
          area.usuarioAdministradorArea = areaElement['usuarioAdministradorArea'];
          this.areas.push(area);
      });
    }, (error) => {
      // this.spinner.hide();
      return throwError('Ha ocurrido un problema, revise conexión a internet');
    }, () => {
    });
  }

  ngAfterViewInit(): void {
  }

  cambiarPagina(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.indicePagina = pageEvent.pageIndex + 1;
    this.tamAnterior = this.tamPagina;
    this.tamPagina = pageEvent.pageSize;
    this.listaEvaluacion = [];
    // tslint:disable-next-line:max-line-length
    this.evaluacionService.getFiltradoPaginacionConHallazgos(0, this.tamPagina * pageEvent.pageIndex, this.tamPagina).subscribe(responseEvaluacion => {
      console.log(responseEvaluacion);
      this.spinner.show();
      responseEvaluacion.forEach(elementEvaluacion => {
        // tslint:disable-next-line:prefer-const
        let evaluacion: Evaluacion = {
          codigo: elementEvaluacion['codigo'],
          fechaCreacion: elementEvaluacion['fechaCreacion'],
          fechaGuardado: elementEvaluacion['fechaGuardado'],
          usuarioRelacionado: elementEvaluacion['usuarioRelacionado'],
          formularioModeloCodigo: elementEvaluacion['formularioModeloCodigo'],
          areaCodigo: elementEvaluacion['areaCodigo'],
          completado: elementEvaluacion['completado'],
          bloqueado: elementEvaluacion['bloqueado'],
          liberado: elementEvaluacion['liberado'],
          hallazgos: elementEvaluacion['hallazgos'],
          foto: [],
          itemsEvaluados: [],
          area: new Area(),
          evaluador: new Colaborador(),
          formulario: new FormularioModelo(),
          formularioNombre: '',
          areaNombre: '',
          nombreEvaluador: '',
          administradorDeArea: '',
          fechaCompletaCreacion: '',
          fechaCompletaGuardado: ''
        };
        // tslint:disable-next-line:prefer-const
        let area: Area = new Area();
        evaluacion.fechaCompletaCreacion = new DatePipe('es-ES').transform(elementEvaluacion['fechaCreacion'], 'MMMM d, y');
        evaluacion.fechaCompletaGuardado = new DatePipe('es-ES').transform(elementEvaluacion['fechaGuardado'], 'MMMM d, y, h:mm:ss');
        this.areaService.getFromCodeLimited(elementEvaluacion['areaCodigo']).subscribe(responseArea => {
          // tslint:disable-next-line:prefer-const
          area.nombre = responseArea['nombre'];
          this.colaboradoresService.getFromCode(responseArea['usuarioAdministradorArea']).subscribe(responseColaborador => {
            const colaboradr: Colaborador = {
              primerNombre: responseColaborador['primerNombre'],
              segundoNombre: responseColaborador['segundoNombre'],
              primerApellido: responseColaborador['primerApellido'],
              segundoApellido: responseColaborador['segundoApellido'],
              username: responseColaborador['username'],
              cedula: responseColaborador['cedula'],
              password: responseColaborador['password'],
              id: 0,
            };
            area.administrador = colaboradr;
          }, (error) => {
            throwError('Ha fallado la carga de datos, revisar conexión de internet');
          }, () => {
            // tslint:disable-next-line:max-line-length
            evaluacion.administradorDeArea = area.administrador.primerNombre + ' ' + area.administrador.segundoNombre + ' ' + area.administrador.primerApellido;
          });
        }, (error) => {
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.area = area;
          evaluacion.areaNombre = area.nombre;
          // tslint:disable-next-line:max-line-length
        });
        let formularioModelo: FormularioModelo = new FormularioModelo();
        this.evaluacionService.getRelation(elementEvaluacion['codigo'], 'formularioEvaluacionFormularioModelorel')
          .subscribe(responseFormularioModelo => {
          formularioModelo = {
            codigo: responseFormularioModelo['codigo'],
            nombre: responseFormularioModelo['nombre'],
            fechaCreacion: responseFormularioModelo['fechaCreacion'],
            cancelado: responseFormularioModelo['cancelado'],
          };
        }, (error) => {
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.formulario = formularioModelo;
          evaluacion.formularioNombre = formularioModelo.nombre;
        });
        // tslint:disable-next-line:prefer-const
        let listaItemEvaluacion: ItemEvaluacion[] = [];
        let colaborador: Colaborador = new Colaborador();
        this.colaboradoresService.getFromCode(elementEvaluacion['usuarioRelacionado']).subscribe(colaboradorResponse => {
          colaborador = {
            primerNombre: colaboradorResponse['primerNombre'],
            segundoNombre: colaboradorResponse['segundoNombre'],
            primerApellido: colaboradorResponse['primerApellido'],
            segundoApellido: colaboradorResponse['segundoApellido'],
            username: colaboradorResponse['username'],
            cedula: colaboradorResponse['cedula'],
            password: colaboradorResponse['password'],
            id: 0,
          };
        }, (error) => {
          this.spinner.hide();
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.evaluador = colaborador;
          evaluacion.nombreEvaluador = colaborador.primerNombre + ' ' + colaborador.primerApellido + ' - ' + colaborador.username;
        });
        this.listaEvaluacion.push(evaluacion);
        this.dataSource = new MatTableDataSource(this.listaEvaluacion);
        this.changeDetectorRefs.detectChanges();
        // this.dataSource.paginator = this.paginatorEvaluacion;
        // this.dataSource.sort = this.sortEvaluacion;
      });
      this.spinner.show();
    }, (error) => {
      this.spinner.hide();
      throwError('Ha fallado la carga de datos, revisar conexión de internet');
    }, () => {
      this.spinner.hide();
    });
  }

  agregarFiltros() {
    this.filtrosWhereAny.and = [];
    if (this.codigoArea > 0) {
      this.filtrosWhereAny.and.push({areaCodigo: this.codigoArea});
    }

    if (this.nombreColor.length > 0) {
      this.filtrosWhereAny.and.push(this.opcionFiltroSemaforo);
    }

    if (this.colaboradorCodigo > 0) {
      this.filtrosWhereAny.and.push({usuarioRelacionado: this.colaboradorCodigo});
    }

    if (this.administradorAreaCodigo > 0) {
      // tslint:disable-next-line:prefer-const
      let arregloOrArea = [];
      let i = 0;
      const filtroArea = this.areas.filter(areaElement => areaElement.usuarioAdministradorArea === this.administradorAreaCodigo);
      const cantidadArea = filtroArea.length;
      filtroArea.forEach(areaElement => {
        arregloOrArea.push({areaCodigo: areaElement.codigo});
        if (i === cantidadArea - 1) {
          this.filtrosWhereAny.and.push({or: arregloOrArea});
        }
        i += 1;
      });
    }
  }

  filtroConFecha() {
    this.filtrosWhereAny.fechaGuardado = {};
    if (this.fechaFiltroInicio && this.fechaFiltroFin) {
      this.filtrosWhereAny.fechaGuardado = {between: [this.fechaFiltroInicio, this.fechaFiltroFin]};
    } else {
      this.filtrosWhereAny.fechaGuardado = undefined;
    }
  }

  buscarFiltro(pageEvent: PageEvent) {
    this.filtrosBetween = [];
    this.filtrosBetween.push(this.fechaFiltroInicio);
    this.filtrosBetween.push(this.fechaFiltroFin);
    if (pageEvent === undefined) {
      this.filtrando = false;
    }
    if (this.filtrando === false) {
      this.agregarFiltros();
      this.filtroConFecha();
      if (this.filtrosWhereAny) {
        this.filtrosWhereAny.and.push({completado: true}, {or: [{liberado: null}, {liberado: 1}]});
        this.cargarCantidadFiltrada(JSON.stringify(this.filtrosWhereAny), null);
      } else if (this.filtrosWhereAny.fechaGuardado === undefined) {
        this.filtrosWhereAny.and.push({completado: true}, {or: [{liberado: null}, {liberado: 1}]});
        this.cargarCantidadFiltrada(JSON.stringify(this.filtrosWhereAny.and), null);
      }
    }
    if (this.filtrando === false) {
      // this.indicePagina = pageEvent.pageIndex + 1;
      // this.tamAnterior = this.tamPagina;
      // this.tamPagina = pageEvent.pageSize;
      // tslint:disable-next-line:max-line-length
      this.agregarFiltros();
      this.filtroConFecha();
      if (this.filtrosWhereAny) {
        this.filtrosWhereAny.and.push({completado: true}, {or: [{liberado: null}, {liberado: 1}]});
        this.buscarEvaluacionesConFiltro(0, this.tamPagina, JSON.stringify(this.filtrosWhereAny), JSON.stringify(this.filtrosBetween));
      } else if (this.filtrosWhereAny.fechaGuardado === undefined) {
        this.filtrosWhereAny.and.push({completado: true}, {or: [{liberado: null}, {liberado: 1}]});
        this.buscarEvaluacionesConFiltro(0, this.tamPagina, JSON.stringify(this.filtrosWhereAny.and), JSON.stringify(this.filtrosBetween));
      }
      this.filtrando = true;
    } else {
      this.indicePagina = pageEvent.pageIndex + 1;
      this.tamAnterior = this.tamPagina;
      this.tamPagina = pageEvent.pageSize;
      this.agregarFiltros();
      this.filtroConFecha();
      if (this.filtrosWhereAny) {
        this.filtrosWhereAny.and.push({completado: true}, {or: [{liberado: null}, {liberado: 1}]});
        // tslint:disable-next-line:max-line-length
        this.buscarEvaluacionesConFiltro(this.tamPagina * pageEvent.pageIndex, this.tamPagina, JSON.stringify(this.filtrosWhereAny), JSON.stringify(this.filtrosBetween));
      } else if (this.filtrosWhereAny.fechaGuardado === undefined) {
        this.filtrosWhereAny.and.push({completado: true}, {or: [{liberado: null}, {liberado: 1}]});
        // tslint:disable-next-line:max-line-length
        this.buscarEvaluacionesConFiltro(this.tamPagina * pageEvent.pageIndex, this.tamPagina, JSON.stringify(this.filtrosWhereAny.and), JSON.stringify(this.filtrosBetween));
      }
    }
  }

  limpiarBusqueda() {
    this.filtrando = false;
    this.fechaFiltroInicio = undefined;
    this.fechaFiltroFin = undefined;
    this.opcionFiltroSemaforo.bloqueado = 0;
    this.opcionFiltroSemaforo.hallazgos = 0;
    this.opcionFiltroSemaforo.liberado = 0;
    this.codigoArea = 0;
    this.nombreColor = '';
    this.indicePagina = 0;
    this.tamPagina = 5;
    this.cantidadEvaluaciones = 0;
    this.colaboradorCodigo = 0;
    this.administradorAreaCodigo = 0;
    setTimeout(t => {
      this.cargarCantidad();
    }, 1000);
    this.listarEvaluaciones();
  }

  agregarValorFiltroWhereArea() {
    this.codigoArea = this.codigoArea;
  }

  cargarCantidadFiltrada(filtrosWhere: string, filtrosBetween: string) {
    const c = 0;
    this.evaluacionService.contarFiltrado(filtrosWhere, filtrosBetween).subscribe(r => {
      this.cantidadEvaluaciones = r['count'];
    }, (error) => {
      throwError('Ha fallado la carga de datos, revisar conexión de internet');
    }, () => {
      // this.cantidadEvaluaciones = c;
    });
  }

  agregarValorFiltroWhereSemaforo() {
    if (this.nombreColor === 'Amarillo') {
      this.opcionFiltroSemaforo.hallazgos = 1;
      this.opcionFiltroSemaforo.liberado = 1;
      this.opcionFiltroSemaforo.bloqueado = 0;
    } else if (this.nombreColor === 'Rojo') {
      this.opcionFiltroSemaforo.bloqueado = 1;
      this.opcionFiltroSemaforo.hallazgos = 1;
      this.opcionFiltroSemaforo.liberado = 1;
    } else if (this.nombreColor === 'Verde') {
      this.opcionFiltroSemaforo.hallazgos = 0;
      this.opcionFiltroSemaforo.bloqueado = 0;
      this.opcionFiltroSemaforo.liberado = 1;
    }
    console.log(this.opcionFiltroSemaforo);
  }

  buscarEvaluacionesConFiltro(desde: number, tamPagina: number, filtrosWhere: string, filtrosBetween: string) {
    // filtroDeEvaluaciones()
    this.listaEvaluacion = [];
    // tslint:disable-next-line:max-line-length
    this.evaluacionService.filtroDeEvaluaciones(desde, tamPagina, filtrosWhere, filtrosBetween).subscribe(responseEvaluacion => {
      console.log(responseEvaluacion);
      this.spinner.show();
      responseEvaluacion.forEach(elementEvaluacion => {
        // tslint:disable-next-line:prefer-const
        let evaluacion: Evaluacion = {
          codigo: elementEvaluacion['codigo'],
          fechaCreacion: elementEvaluacion['fechaCreacion'],
          fechaGuardado: elementEvaluacion['fechaGuardado'],
          usuarioRelacionado: elementEvaluacion['usuarioRelacionado'],
          formularioModeloCodigo: elementEvaluacion['formularioModeloCodigo'],
          areaCodigo: elementEvaluacion['areaCodigo'],
          completado: elementEvaluacion['completado'],
          bloqueado: elementEvaluacion['bloqueado'],
          liberado: elementEvaluacion['liberado'],
          hallazgos: elementEvaluacion['hallazgos'],
          foto: [],
          itemsEvaluados: [],
          area: new Area(),
          evaluador: new Colaborador(),
          formulario: new FormularioModelo(),
          formularioNombre: '',
          areaNombre: '',
          nombreEvaluador: '',
          administradorDeArea: '',
          fechaCompletaCreacion: '',
          fechaCompletaGuardado: ''
        };
        // tslint:disable-next-line:prefer-const
        let area: Area = new Area();
        evaluacion.fechaCompletaCreacion = new DatePipe('es-ES').transform(elementEvaluacion['fechaCreacion'], 'MMMM d, y');
        evaluacion.fechaCompletaGuardado = new DatePipe('es-ES').transform(elementEvaluacion['fechaGuardado'], 'MMMM d, y, h:mm:ss');
        this.areaService.getFromCodeLimited(elementEvaluacion['areaCodigo']).subscribe(responseArea => {
          // tslint:disable-next-line:prefer-const
          area.nombre = responseArea['nombre'];
          this.colaboradoresService.getFromCode(responseArea['usuarioAdministradorArea']).subscribe(responseColaborador => {
            const colaboradr: Colaborador = {
              primerNombre: responseColaborador['primerNombre'],
              segundoNombre: responseColaborador['segundoNombre'],
              primerApellido: responseColaborador['primerApellido'],
              segundoApellido: responseColaborador['segundoApellido'],
              username: responseColaborador['username'],
              cedula: responseColaborador['cedula'],
              password: responseColaborador['password'],
              id: 0,
            };
            area.administrador = colaboradr;
          }, (error) => {
            throwError('Ha fallado la carga de datos, revisar conexión de internet');
          }, () => {
            // tslint:disable-next-line:max-line-length
            evaluacion.administradorDeArea = area.administrador.primerNombre + ' ' + area.administrador.segundoNombre + ' ' + area.administrador.primerApellido;
          });
        }, (error) => {
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.area = area;
          evaluacion.areaNombre = area.nombre;
          // tslint:disable-next-line:max-line-length
        });
        let formularioModelo: FormularioModelo = new FormularioModelo();
        this.evaluacionService.getRelation(elementEvaluacion['codigo'], 'formularioEvaluacionFormularioModelorel')
          .subscribe(responseFormularioModelo => {
          formularioModelo = {
            codigo: responseFormularioModelo['codigo'],
            nombre: responseFormularioModelo['nombre'],
            fechaCreacion: responseFormularioModelo['fechaCreacion'],
            cancelado: responseFormularioModelo['cancelado'],
          };
        }, (error) => {
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.formulario = formularioModelo;
          evaluacion.formularioNombre = formularioModelo.nombre;
        });
        // tslint:disable-next-line:prefer-const
        let listaItemEvaluacion: ItemEvaluacion[] = [];
        let colaborador: Colaborador = new Colaborador();
        this.colaboradoresService.getFromCode(elementEvaluacion['usuarioRelacionado']).subscribe(colaboradorResponse => {
          colaborador = {
            primerNombre: colaboradorResponse['primerNombre'],
            segundoNombre: colaboradorResponse['segundoNombre'],
            primerApellido: colaboradorResponse['primerApellido'],
            segundoApellido: colaboradorResponse['segundoApellido'],
            username: colaboradorResponse['username'],
            cedula: colaboradorResponse['cedula'],
            password: colaboradorResponse['password'],
            id: 0,
          };
        }, (error) => {
          this.spinner.hide();
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.evaluador = colaborador;
          evaluacion.nombreEvaluador = colaborador.primerNombre + ' ' + colaborador.primerApellido + ' - ' + colaborador.username;
        });
        this.listaEvaluacion.push(evaluacion);
        this.dataSource = new MatTableDataSource(this.listaEvaluacion);
        this.changeDetectorRefs.detectChanges();
        // this.dataSource.paginator = this.paginatorEvaluacion;
        // this.dataSource.sort = this.sortEvaluacion;
      });
      this.spinner.show();
    }, (error) => {
      this.spinner.hide();
      throwError('Ha fallado la carga de datos, revisar conexión de internet');
    }, () => {
      this.spinner.hide();
    });
  }

  cargarCantidad() {
    let c = 0;
    this.evaluacionService.contar().subscribe(r => {
      c = r['count'];
      this.cantidadEvaluaciones = r['count'];
    }, (error) => {
      throwError('Ha fallado la carga de datos, revisar conexión de internet');
    }, () => {
      this.cantidadEvaluaciones = c;
    });
  }

  listarEvaluaciones() {
    this.listaEvaluacion = [];
    this.spinner.show();
    this.evaluacionService.getFiltradoPaginacionConHallazgos(0, this.indicePagina, this.tamPagina).subscribe(responseEvaluacion => {
      console.log(responseEvaluacion);
      this.spinner.show();
      responseEvaluacion.forEach(elementEvaluacion => {
        // tslint:disable-next-line:prefer-const
        let evaluacion: Evaluacion = {
          codigo: elementEvaluacion['codigo'],
          fechaCreacion: elementEvaluacion['fechaCreacion'],
          fechaGuardado: elementEvaluacion['fechaGuardado'],
          usuarioRelacionado: elementEvaluacion['usuarioRelacionado'],
          formularioModeloCodigo: elementEvaluacion['formularioModeloCodigo'],
          areaCodigo: elementEvaluacion['areaCodigo'],
          completado: elementEvaluacion['completado'],
          bloqueado: elementEvaluacion['bloqueado'],
          liberado: elementEvaluacion['liberado'],
          hallazgos: elementEvaluacion['hallazgos'],
          foto: [],
          itemsEvaluados: [],
          area: new Area(),
          evaluador: new Colaborador(),
          formulario: new FormularioModelo(),
          formularioNombre: '',
          areaNombre: '',
          nombreEvaluador: '',
          administradorDeArea: '',
          fechaCompletaCreacion: '',
          fechaCompletaGuardado: ''
        };
        // tslint:disable-next-line:prefer-const
        let area: Area = new Area();
        evaluacion.fechaCompletaCreacion = new DatePipe('es-ES').transform(elementEvaluacion['fechaCreacion'], 'MMMM d, y');
        evaluacion.fechaCompletaGuardado = new DatePipe('es-ES').transform(elementEvaluacion['fechaGuardado'], 'MMMM d, y, h:mm:ss');
        this.areaService.getFromCodeLimited(elementEvaluacion['areaCodigo']).subscribe(responseArea => {
          // tslint:disable-next-line:prefer-const
          area.nombre = responseArea['nombre'];
          /*area.foto[0] = responseArea['foto1'];
          area.foto[1] = responseArea['foto2'];
          area.foto[2] = responseArea['foto3'];
          area.foto[3] = responseArea['foto4'];
          area.foto[4] = responseArea['foto5'];
          area.foto[5] = responseArea['foto6'];
          area.foto[6] = responseArea['foto7'];
          area.foto[7] = responseArea['foto8'];
          area.foto[8] = responseArea['foto9'];
          area.foto[9] = responseArea['foto10'];*/
          this.colaboradoresService.getFromCode(responseArea['usuarioAdministradorArea']).subscribe(responseColaborador => {
            const colaboradr: Colaborador = {
              primerNombre: responseColaborador['primerNombre'],
              segundoNombre: responseColaborador['segundoNombre'],
              primerApellido: responseColaborador['primerApellido'],
              segundoApellido: responseColaborador['segundoApellido'],
              username: responseColaborador['username'],
              cedula: responseColaborador['cedula'],
              password: responseColaborador['password'],
              id: 0,
            };
            area.administrador = colaboradr;
          }, (error) => {
            throwError('Ha fallado la carga de datos, revisar conexión de internet');
          }, () => {
            // tslint:disable-next-line:max-line-length
            evaluacion.administradorDeArea = area.administrador.primerNombre + ' ' + area.administrador.segundoNombre + ' ' + area.administrador.primerApellido;
          });
        }, (error) => {
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.area = area;
          evaluacion.areaNombre = area.nombre;
          // tslint:disable-next-line:max-line-length
        });
        let formularioModelo: FormularioModelo = new FormularioModelo();
        this.evaluacionService.getRelation(elementEvaluacion['codigo'], 'formularioEvaluacionFormularioModelorel')
          .subscribe(responseFormularioModelo => {
          formularioModelo = {
            codigo: responseFormularioModelo['codigo'],
            nombre: responseFormularioModelo['nombre'],
            fechaCreacion: responseFormularioModelo['fechaCreacion'],
            cancelado: responseFormularioModelo['cancelado'],
          };
        }, (error) => {
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.formulario = formularioModelo;
          evaluacion.formularioNombre = formularioModelo.nombre;
        });
        // tslint:disable-next-line:prefer-const
        let listaItemEvaluacion: ItemEvaluacion[] = [];
        /*this.itemEvaluacionService.getAllWhere(elementEvaluacion['codigo'], 'formularioEvaluacionCodigo').subscribe(responseItem => {
          responseItem.forEach(elementItem => {
            // tslint:disable-next-line:prefer-const
            let itemEvaluacion: ItemEvaluacion = {
              codigo: elementItem['codigo'],
              fechaCreacion: elementItem['fechaCreacion'],
              fechaGuardado: elementItem['fechaGuardado'],
              evaluacion: elementItem['evaluacion'],
              comentario: elementItem['comentario'],
              formularioEvaluacionCodigo: elementItem['formularioEvaluacionCodigo'],
              imagen: elementItem['imagen'],
              usuarioRelacionado: elementItem['usuarioRelacionado'],
              itemCodigo: elementItem['itemCodigo'],
              itemNombre: '',
              definicion: '',
              fechaGuardadoCompleta: ''
            };
            let nombreItem: string;
            let definicion: string;
            this.itemEvaluacionService.getRelation(elementItem['codigo'], 'itemEvaluacionItemrel')
              .subscribe(itemNoEvaluacionResponse => {
                // console.log(itemNoEvaluacionResponse);
                nombreItem = itemNoEvaluacionResponse['nombre'];
                definicion = itemNoEvaluacionResponse['definicion'];
              }, (error) => {
                return throwError('Ha fallado la carga de datos, revisar conexión de internet');
              }, () => {
                itemEvaluacion.itemNombre = nombreItem;
                itemEvaluacion.definicion = definicion;
                // tslint:disable-next-line:max-line-length
                itemEvaluacion.fechaGuardadoCompleta =
                  new DatePipe('es-ES').transform(elementEvaluacion['fechaGuardado'], 'MMMM d, y, h:mm:ss');
              });
            listaItemEvaluacion.push(itemEvaluacion);
          });
        }, (error) => {
          this.spinner.hide();
          return throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.itemsEvaluados = listaItemEvaluacion;
        });*/
        let colaborador: Colaborador = new Colaborador();
        this.colaboradoresService.getFromCode(elementEvaluacion['usuarioRelacionado']).subscribe(colaboradorResponse => {
          colaborador = {
            primerNombre: colaboradorResponse['primerNombre'],
            segundoNombre: colaboradorResponse['segundoNombre'],
            primerApellido: colaboradorResponse['primerApellido'],
            segundoApellido: colaboradorResponse['segundoApellido'],
            username: colaboradorResponse['username'],
            cedula: colaboradorResponse['cedula'],
            password: colaboradorResponse['password'],
            id: 0,
          };
        }, (error) => {
          this.spinner.hide();
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.evaluador = colaborador;
          evaluacion.nombreEvaluador = colaborador.primerNombre + ' ' + colaborador.primerApellido + ' - ' + colaborador.username;
        });
        this.listaEvaluacion.push(evaluacion);
        this.dataSource = new MatTableDataSource(this.listaEvaluacion);
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginatorEvaluacion;
        this.dataSource.sort = this.sortEvaluacion;
      });
      this.spinner.show();
    }, (error) => {
      this.spinner.hide();
      throwError('Ha fallado la carga de datos, revisar conexión de internet');
    }, () => {
      this.spinner.hide();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarFormulario(evaluacion: Evaluacion) {
    this.spinner.show();
    this.cancelar();
    this.evaluacionService.getFromCode(evaluacion.codigo)
      .subscribe(evaluacionResponse => {
        evaluacion.foto = [
          evaluacionResponse['foto1'],
          evaluacionResponse['foto2'],
          evaluacionResponse['foto3'],
          evaluacionResponse['foto4'],
          evaluacionResponse['foto5'],
          evaluacionResponse['foto6'],
          evaluacionResponse['foto7'],
          evaluacionResponse['foto8'],
          evaluacionResponse['foto9'],
          evaluacionResponse['foto10']
        ];
      }, error => {
        throwError('Ha fallado la carga de datos, revisar conexión de internet');
      }, () => {
        // tslint:disable-next-line:prefer-const
        this.evaluacionService.getRelation(evaluacion.codigo, 'formularioEvaluacionArearel')
        .subscribe(responseArea => {
          evaluacion.area.foto[0] = responseArea['foto1'];
          evaluacion.area.foto[1] = responseArea['foto2'];
          evaluacion.area.foto[2] = responseArea['foto3'];
          evaluacion.area.foto[3] = responseArea['foto4'];
          evaluacion.area.foto[4] = responseArea['foto5'];
          evaluacion.area.foto[5] = responseArea['foto6'];
          evaluacion.area.foto[6] = responseArea['foto7'];
          evaluacion.area.foto[7] = responseArea['foto8'];
          evaluacion.area.foto[8] = responseArea['foto9'];
          evaluacion.area.foto[9] = responseArea['foto10'];
          // tslint:disable-next-line:prefer-const
        }, (error) => {
          throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          // tslint:disable-next-line:prefer-const
          this.dataSourceImagenes = new MatTableDataSource();
          let listaItemEvaluacion: ItemEvaluacion[] = [];
          this.itemEvaluacionService.getAllWhere(evaluacion.codigo, 'formularioEvaluacionCodigo').subscribe(responseItem => {
            responseItem.forEach(elementItem => {
              // tslint:disable-next-line:prefer-const
              let itemEvaluacion: ItemEvaluacion = {
                codigo: elementItem['codigo'],
                fechaCreacion: elementItem['fechaCreacion'],
                fechaGuardado: elementItem['fechaGuardado'],
                evaluacion: elementItem['evaluacion'],
                comentario: elementItem['comentario'],
                formularioEvaluacionCodigo: elementItem['formularioEvaluacionCodigo'],
                imagen: elementItem['imagen'],
                usuarioRelacionado: elementItem['usuarioRelacionado'],
                itemCodigo: elementItem['itemCodigo'],
                itemNombre: '',
                definicion: '',
                fechaGuardadoCompleta: '',
                imagen2: elementItem['imagen2']
              };
              let nombreItem: string;
              let definicion: string;
              this.itemEvaluacionService.getRelation(elementItem['codigo'], 'itemEvaluacionItemrel')
                .subscribe(itemNoEvaluacionResponse => {
                  // console.log(itemNoEvaluacionResponse);
                  nombreItem = itemNoEvaluacionResponse['nombre'];
                  definicion = itemNoEvaluacionResponse['definicion'];
                }, (error) => {
                  throwError('Ha fallado la carga de datos, revisar conexión de internet');
                }, () => {
                  itemEvaluacion.itemNombre = nombreItem;
                  itemEvaluacion.definicion = definicion;
                  // tslint:disable-next-line:max-line-length
                  itemEvaluacion.fechaGuardadoCompleta =
                    new DatePipe('es-ES').transform(elementItem['fechaGuardado'], 'MMMM d, y, h:mm:ss');
                });
              listaItemEvaluacion.push(itemEvaluacion);
            });
          }, (error) => {
            this.spinner.hide();
            throwError('Ha fallado la carga de datos, revisar conexión de internet');
          }, () => {
            // tslint:disable-next-line:prefer-const
            let imagenes: Imagen[] = [];
            this.cargandoCuestion = false;
            this.iterable.forEach(element => {
              if (evaluacion.foto[element] !== null && evaluacion.foto[element] !== '') {
                imagenes.push(new Imagen(evaluacion.area.foto[element], evaluacion.foto[element]));
                console.log(evaluacion.foto[element]);
              }
              if (element === 9) {
                this.dataSourceImagenes = new MatTableDataSource(imagenes);
                this.cargandoCuestion = true;
              }
            });
            evaluacion.itemsEvaluados = listaItemEvaluacion;
            this.dataSourceEvaluacion = new MatTableDataSource(evaluacion.itemsEvaluados);
            // this.dataSourceImagenes = new MatTableDataSource(imagenes);
            this.dataSourceEvaluacion.paginator = this.paginatorVistaEvaluacion;
            this.dataSourceEvaluacion.sort = this.sortVistaEvaluacion;
            this.evaluacion = evaluacion;
            console.log(evaluacion);
            this.seActivo = true;
            this.spinner.hide();
          });
        });
      });
  }

  eliminarFormularioEvaluacion(evaluacion: Evaluacion) {
    // console.log(evaluacion);
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
        const evaluacionActualizada = {
          codigo: evaluacion.codigo,
        };
        this.spinner.show();
        this.itemEvaluacionService.deleteAllPorCodigoFormularioEvaluacion(evaluacionActualizada.codigo).subscribe(r => {
          console.log(r);
        }, (error) => {
          return throwError('Ha fallado el eliminar la evaluación, revisar conexión de internet');
        }, () => {
          this.evaluacionService.publicdelete(evaluacionActualizada).subscribe(updatedUserResponse => {
            console.log(updatedUserResponse);
          }, (error) => {
            return throwError('Ha fallado el eliminar la evaluación, revisar conexión de internet');
          }, () => {
              this.spinner.hide();
              this.listaEvaluacion.splice(this.listaEvaluacion.findIndex(c => c.codigo === evaluacion.codigo), 1);
              this.dataSource.data = [];
              this.dataSource.data = this.listaEvaluacion;
              this.cargarCantidad();
              swal.fire(
                '!Eliminado con exito¡',
                'La evaluación ha sido eliminada con exito.',
                'success'
              );
          });
        });
        // this.evaluacionService.publicdelete(evaluacionActualizada).subscribe(updatedUserResponse => {
        // }, (error) => {
        //   return throwError('Ha fallado el eliminar la evaluación, revisar conexión de internet');
        // }, () => {
        //   // let i = 0;
        //   /*listaItemEvaluacion.forEach(elementEliminarItem => {
        //     const evaluacionItemDelete = {
        //       codigo: elementEliminarItem.codigo
        //     };
        //     this.itemEvaluacionService.publicdelete(evaluacionItemDelete).subscribe(eliminarResonse => {
        //     }, (error) => {
        //       return throwError('Ha fallado el eliminar la evaluación, revisar conexión de internet');
        //     }, () => {
        //     });
        //     if (i === listaItemEvaluacion.length - 1) {
        //       // this.itemEvaluacionService.publicdelete()
        //       this.spinner.hide();
        //       this.listaEvaluacion.splice(this.listaEvaluacion.findIndex(c => c.codigo === evaluacion.codigo), 1);
        //       this.dataSource.data = [];
        //       this.dataSource.data = this.listaEvaluacion;
        //       swal.fire(
        //         '!Eliminado con exito¡',
        //         'La evaluación ha sido eliminada con exito.',
        //         'success'
        //       );
        //     }
        //     i += 1;
        //   });*/
        //   const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
        //   // const everySixHours$ = interval(6 * 60 * 60 * 1000);
        //   // const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
        //   // everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
        //   appIsStable$.subscribe(() => {
        //     this.swUpdate.checkForUpdate();
        //   });
        //   this.spinner.hide();
        //   this.listaEvaluacion.splice(this.listaEvaluacion.findIndex(c => c.codigo === evaluacion.codigo), 1);
        //   this.dataSource.data = [];
        //   this.dataSource.data = this.listaEvaluacion;
        //   this.cargarCantidad();
        //   swal.fire(
        //     '!Eliminado con exito¡',
        //     'La evaluación ha sido eliminada con exito.',
        //     'success'
        //   );
        // });
        // tslint:disable-next-line:prefer-const
        /* let listaItemEvaluacion: ItemEvaluacion[] = [];
        let i = 0;
        this.itemEvaluacionService.getAllWhere(evaluacion.codigo, 'formularioEvaluacionCodigo').subscribe(responseItem => {
          responseItem.forEach(elementItem => {
            // tslint:disable-next-line:prefer-const
            let itemEvaluacion: ItemEvaluacion = {
              codigo: elementItem['codigo'],
              fechaCreacion: elementItem['fechaCreacion'],
              fechaGuardado: elementItem['fechaGuardado'],
              evaluacion: elementItem['evaluacion'],
              comentario: elementItem['comentario'],
              formularioEvaluacionCodigo: elementItem['formularioEvaluacionCodigo'],
              imagen: elementItem['imagen'],
              usuarioRelacionado: elementItem['usuarioRelacionado'],
              itemCodigo: elementItem['itemCodigo'],
              itemNombre: '',
              definicion: '',
              fechaGuardadoCompleta: ''
            };
            // let nombreItem: string;
            // let definicion: string;
            /*this.itemEvaluacionService.getRelation(elementItem['codigo'], 'itemEvaluacionItemrel')
              .subscribe(itemNoEvaluacionResponse => {
                // console.log(itemNoEvaluacionResponse);
                nombreItem = itemNoEvaluacionResponse['nombre'];
                definicion = itemNoEvaluacionResponse['definicion'];
              }, (error) => {
                throwError('Ha fallado la carga de datos, revisar conexión de internet');
              }, () => {
                itemEvaluacion.itemNombre = nombreItem;
                itemEvaluacion.definicion = definicion;
                // tslint:disable-next-line:max-line-length
                itemEvaluacion.fechaGuardadoCompleta =
                  new DatePipe('es-ES').transform(elementItem['fechaGuardado'], 'MMMM d, y, h:mm:ss');
              });
            listaItemEvaluacion.push(itemEvaluacion);
            const evaluacionItemDelete = {
              codigo: elementItem['codigo']
            };

            this.itemEvaluacionService.publicdelete(evaluacionItemDelete).subscribe(updatedUserResponse => {
            }, (error) => {
              return throwError('Ha fallado el eliminar la evaluación, revisar conexión de internet');
            }, () => {
              if (i === listaItemEvaluacion.length - 1) {

                this.evaluacionService.publicdelete(evaluacionActualizada).subscribe(updatedUserResponse => {
                }, (error) => {
                  return throwError('Ha fallado el eliminar la evaluación, revisar conexión de internet');
                }, () => {
                  // let i = 0;
                  /*listaItemEvaluacion.forEach(elementEliminarItem => {
                    const evaluacionItemDelete = {
                      codigo: elementEliminarItem.codigo
                    };
                    this.itemEvaluacionService.publicdelete(evaluacionItemDelete).subscribe(eliminarResonse => {
                    }, (error) => {
                      return throwError('Ha fallado el eliminar la evaluación, revisar conexión de internet');
                    }, () => {
                    });
                    if (i === listaItemEvaluacion.length - 1) {
                      // this.itemEvaluacionService.publicdelete()
                      this.spinner.hide();
                      this.listaEvaluacion.splice(this.listaEvaluacion.findIndex(c => c.codigo === evaluacion.codigo), 1);
                      this.dataSource.data = [];
                      this.dataSource.data = this.listaEvaluacion;
                      swal.fire(
                        '!Eliminado con exito¡',
                        'La evaluación ha sido eliminada con exito.',
                        'success'
                      );
                    }
                    i += 1;
                  });
                  this.spinner.hide();
                  this.listaEvaluacion.splice(this.listaEvaluacion.findIndex(c => c.codigo === evaluacion.codigo), 1);
                  this.dataSource.data = [];
                  this.dataSource.data = this.listaEvaluacion;
                  swal.fire(
                    '!Eliminado con exito¡',
                    'La evaluación ha sido eliminada con exito.',
                    'success'
                  );
                });
              }
              i += 1;
            });
          });
        }, (error) => {
          throwError('Ha fallado el eliminar la evaluación, revisar conexión de internet');
        }, () => {
        });*/
    //   }
    // });
      }
    });
  }


  print(evaluacion: Evaluacion) {
    let printContents, popupWin;
    // tslint:disable-next-line:prefer-const
    let titulo = evaluacion.formularioNombre;
    let imprimir = `
            <div class="container" style="border: 2px solid; border-radius: 5px;">
              <div class="row">
                  <div class="col-xs-12">
                  <div class="invoice-title" style="border-bottom: 2px solid">
                    <h2>${evaluacion.areaNombre}</h2><h3 class="pull-right"></h3>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-xs-6">
                      <address>
                      <strong>Evaluador:</strong><br>
                        ${evaluacion.evaluador.primerNombre} ${(evaluacion.evaluador.segundoNombre !== null && evaluacion.evaluador.segundoNombre !== '') ? evaluacion.evaluador.segundoNombre : ''}
                        ${evaluacion.evaluador.primerApellido} ${(evaluacion.evaluador.segundoApellido !== null && evaluacion.evaluador.segundoApellido !== '') ? evaluacion.evaluador.segundoApellido : ''}<br>
                      </address>
                    </div>
                    <div class="col-xs-6 text-right">
                      <address>
                        <strong>Administrador de Área:</strong><br>
                        ${evaluacion.administradorDeArea}<br>
                      </address>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-6">
                      <address>
                        <strong>Cantidad de items evaluados:</strong><br>
                        ${evaluacion.itemsEvaluados.length}<br>
                      </address>
                    </div>
                    <div class="col-xs-6 text-right">
                      <address>
                        <strong>Fecha de envío:</strong><br>
                        ${evaluacion.fechaCompletaGuardado}<br>
                      </address>
                    </div>
                  </div>
                </div>
              </div>`;
imprimir += `<div class="row">
              <div class="col-md-12">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title"><strong>${evaluacion.formularioNombre}</strong></h3>
                  </div>
                  <div class="panel-body">
                    <div>`;
          imprimir += '<table class="table table-condensed">';
          imprimir += `<thead>
                          <tr id="top">
                              <th><strong>Item</strong></th>
                              <th><strong>Definición</strong></th>
                              <th><strong>Resultado</strong></th>
                              <th><strong>Observación</strong></th>
                          </tr>
                      </thead>
                      <tbody>`;
            evaluacion.itemsEvaluados.forEach(item => {
              imprimir += `<tr>
                              <td><strong>${item.itemNombre}</strong></td>
                              <td>${item.definicion}</td>
                              <td>${(item.evaluacion === 1) ? 'Si Cumple' : 'No Cumple'}</td>
                              <td>${item.comentario}</td>
                          </tr>`;
            });
    imprimir += `       <tbody>
                      </table>
                    </div>
                      <div id="wrapperHeader2">
                        FI02-PG04<br/>Rev. C.1<br/>Fecha: 04.10.18
                      </div>
                    </div>
              </div>
            </div>
          </div>`;
    // printContents = document.getElementById('print-section').innerHTML; text-center text-right id="top"
    popupWin = window.open('', '_blank', 'scrollbars=yes,resizable=yes,top=0,left=0,height=600%,width=600%');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
          <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
          <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
          <title>${titulo}</title>
          <style>
            .invoice-title h2, .invoice-title h3 {
              display: inline-block;
            }
            .table > tbody > tr > .no-line {
              border-top: 2px solid;
            }
            .table > thead > tr > .no-line {
              border-bottom: none;
            }
            .table > tbody > tr > .thick-line {
              border-top: 5px solid;
            }
            div#wrapperHeader {
              width:50%;
              height;200px; /* height of the background image? */
              background:url(images/header.png) repeat-x 0 0;
              text-align:left;
             }
             div#wrapperHeader div#header {
              width:1000px;
              height:200px;
              margin:0 auto;
             }
             div#wrapperHeader div#header img {
              width:; /* the width of the logo image */
              height:; /* the height of the logo image */
              margin:0 auto;
             }
             div#wrapperHeader2 {
              width:100%;
              height;100px; /* height of the background image? */
              text-align:right;
             }
             .footer {
              position: fixed;
              left: 0;
              bottom: 0;
              width: 100%;
              color: white;
              text-align: center;
           }
          </style>
        </head>
    <body onload="window.print();window.close()">
         <div id="wrapperHeader">
              <div id="header">
                 <img src="http://abt.com.do/wp-content/themes/abt/images/logo.jpg" alt="logo" />
              </div>
         </div>
         <div id="wrapperHeader2">
            FI02-PG04<br/>Rev. C.1<br/>Fecha: 04.10.18
         </div>
        ${imprimir}
    </body>
      </html>`
    );
    popupWin.document.close();
  }
  cancelar() {
    this.seActivo = false;
    this.evaluacion = new Evaluacion();
    this.dataSourceEvaluacion = new MatTableDataSource(this.evaluacion.itemsEvaluados);
    this.dataSourceEvaluacion.paginator = this.paginatorVistaEvaluacion;
    this.dataSourceEvaluacion.sort = this.sortVistaEvaluacion;
  }
}
