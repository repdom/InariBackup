import { Component, OnInit, ViewChild, ChangeDetectorRef, EventEmitter, AfterViewInit, ApplicationRef } from '@angular/core';
import { EvaluacionService } from '../../services/evaluacion/evaluacion.service';
import { ItemEvaluacionService } from 'src/app/services/evaluacion/item-evaluacion.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, PageEvent } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Area, FormularioModelo } from '../../clases/formulario/formulario';
import { throwError } from 'rxjs';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import { Colaborador } from '../../clases/formulario/colaborador';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { AreaService } from '../../services/area/area.service';
import swal from 'sweetalert2';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { Evaluacion, ItemEvaluacion, Imagen } from '../listar-evaluacion/listar-evaluacion.component';
import { BloqueadosService } from 'src/app/services/bloqueados/bloqueados.service';
import { ItemEspecialesService } from 'src/app/services/itemEspeciales/item-especiales.service';
import { NgxImageCompressService } from 'ngx-image-compress';

export class ItemEspecialesEvaluacion {
  codigo = 0;
  nombre = '';
  importante = false;
  cumplido = false ;
  fechaSolicitada = '';
  fechaAprobada = '';
  formularioEvaluacionCodigo = 0;
  codigoItemEspeciales = 1;
}

export class HistorialDeFormulario {
  nombreDelPublicador: string = '';
  codigoDelPublicador: string = '';
  comentario: string = '';
  codigo: number = 0;
  formularioCodigo: number = 0;
}

@Component({
  selector: 'app-formularios-bloqueados',
  templateUrl: './formularios-bloqueados.component.html',
  styleUrls: ['./formularios-bloqueados.component.scss']
})
export class FormulariosBloqueadosComponent implements OnInit, AfterViewInit {
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
  images = ['http://abt.com.do/wp-content/themes/abt/images/logo.jpg'];
  seActivo = false;
  cantidadEvaluaciones: number;
  tamPaginas: number [] = [5, 10, 20];
  tamPagina =  5;
  indicePagina = 0;
  acumuladorPagina = 0;
  tamAnterior = 0;
  abrir = false;
  contador = 0;
  public imageSrc: string = '';
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  nuevoComentario: string = '';

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
              private bloqueadosService: BloqueadosService,
              private itemEspecialesService: ItemEspecialesService,
              private imageCompress: NgxImageCompressService) { }

  ngOnInit() {
    setTimeout(t => {
      this.cargarCantidad();
    }, 1000);
    this.listarEvaluaciones();
    // this.cargarCantidad();
    // this._DomSanitizer.bypassSecurityTrustResourceUrl()
    // this._DomSanitizer.bypassSecurityTrustHtml('http://abt.com.do/wp-content/themes/abt/images/logo.jpg')
  }

  ngAfterViewInit(): void {
  }

  cambiarPagina(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.indicePagina = pageEvent.pageIndex + 1;
    this.tamAnterior = this.tamPagina;
    this.tamPagina = pageEvent.pageSize;
    // this.cantidadEvaluaciones = pageEvent.length;
    /*if (pageEvent.previousPageIndex > pageEvent.pageIndex && pageEvent.length !== this.listaEvaluacion.length) {
      this.acumuladorPagina += this.tamPagina;
      console.log(this.acumuladorPagina);
    } else if (pageEvent.previousPageIndex === pageEvent.pageIndex && pageEvent.pageSize > this.tamAnterior) {
      // this.acumuladorPagina -= this.tamPagina;
      this.acumuladorPagina += this.tamAnterior;
      console.log(this.acumuladorPagina);
    } else if (pageEvent.previousPageIndex > pageEvent.pageIndex && pageEvent.pageSize < this.tamAnterior) {
      this.acumuladorPagina -= this.tamAnterior;
    }*/
    this.listaEvaluacion = [];
    // tslint:disable-next-line:max-line-length
    this.bloqueadosService.getFilteredPagination(true, this.tamPagina * pageEvent.pageIndex, this.tamPagina).subscribe(responseEvaluacion => {
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

  handleInputChange(e, itemEvaluacion: ItemEvaluacion, i: number) {
    // tslint:disable-next-line:prefer-const
    // let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    // tslint:disable-next-line:prefer-const
    let file = e.target.files[0];
    this.spinner.show();
    // tslint:disable-next-line:prefer-const
    let pattern = /image-*/;
    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Debe de elegir una imagen',
      });
      return;
    }
    // setTimeout(() => {
      /** spinner ends after 5 seconds */
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
      itemEvaluacion.imagen2 = this.imageSrc;
      this.spinner.hide();
    // }, 5000);
  }
  _handleReaderLoaded(e) {
    // tslint:disable-next-line:prefer-const
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
  }
  changeListener($event, area: Area, i: number): void {
    this.readThis($event.target, area, i);
  }
  readThis(inputValue: any, area: Area, i: number): void {
    // tslint:disable-next-line:prefer-const
    let file: File = inputValue.files[0];
    // tslint:disable-next-line:prefer-const
    let myReader: FileReader = new FileReader();

    // tslint:disable-next-line:prefer-const
    let pattern = /image-*/;
    if (!file.type.match(pattern)) {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Debe de elegir una imagen',
      });
      return;
    }
    myReader.onloadend = (e) => {
      console.warn('Size in bytes was:', this.imageCompress.byteCount(String(myReader.result)));
      console.log(String(myReader.result));
      this.imageCompress.uploadFile().then(({image, orientation}) => {

        // this.imgResultBeforeCompress = image;
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
        // console.log(this.imgResultBeforeCompress);
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            area.foto[i] = result;
            area.fotoAreaCargoDesdeDB[i] = false;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(area.foto[i]));
            console.log(area.foto[i]);
          }
        );
      });
    };
    myReader.readAsDataURL(file);
  }

  compressFile(itemEvaluacion: ItemEvaluacion) {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.spinner.show();
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      if  (this.imageCompress.byteCount(image) < 720000) {
        itemEvaluacion.imagen2 = image;
        console.warn('Size in bytes is now:', this.imageCompress.byteCount(itemEvaluacion.imagen2));
        console.log(itemEvaluacion.imagen2);
        this.spinner.hide();
      } else {
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            this.spinner.hide();
            itemEvaluacion.imagen2 = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(itemEvaluacion.imagen2));
            console.log(this.imgResultBeforeCompress);
            console.log(itemEvaluacion.imagen2);
          }
        );
      }
      /*this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          console.log(this.imgResultAfterCompress);
        }
      );*/
    });
  }

  comentar(evaluacion: Evaluacion) {
    let nombre = '';
    this.colaboradoresService.getFromCode(Number(this.cookieService.get('userid'))).subscribe(user => {
      nombre = user['primerNombre'] + user['segundoNombre'] + user['primerApellido'] + user['segundoApellido'];

    });
    const historial = {
      nombreDelPublicador: nombre,
      codigoDelPublicador: this.cookieService.get('userid'),
      comentario:  '',
      codigo: 0,
      formularioCodigo:  ,
    }
  }

  guardarFormularioBloqueado(evaluacion) {
    console.log(evaluacion);
    this.spinner.show();
    let cont = 0;
    evaluacion.itemsEvaluados.forEach(iE => {
      const i = {
        codigo: iE.codigo,
        imagen: iE.imagen,
        imagen2: iE.imagen2
      };
      this.itemEvaluacionService.update(i).subscribe(r => {
        console.log(r);
      });
    });

    evaluacion.itemEspeciales.forEach(cargando => {
      const gurdar = {
          cumplido: cargando['cumplido'],
          fechaAprobada: cargando['fechaAprobada'],
          fechaSolicitada: cargando['fechaSolicitada'],
          formularioEvaluacionCodigo: cargando['formularioEvaluacionCodigo'],
          importante: cargando['importante'],
          nombre: cargando['nombre']
      };
      this.bloqueadosService.actualizarItemsEspecialesEnlazados(evaluacion.codigo, cargando.codigo, gurdar)
        .subscribe(actualizando => {
      }, (error) => {
        console.log(error);
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      });
    });
  }

  cargarCantidad() {
    const c = 0;
    this.evaluacionService.count().subscribe(r => {
      this.cantidadEvaluaciones = r['count'];
    }, (error) => {
      throwError('Ha fallado la carga de datos, revisar conexión de internet');
    }, () => {
      // this.cantidadEvaluaciones = c;
    });
  }

  listarEvaluaciones() {
    this.spinner.show();
    this.bloqueadosService.getFilteredPagination(true, this.indicePagina, this.tamPagina).subscribe(responseEvaluacion => {
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
    this.abrir = true;
    this.spinner.show();
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
            this.contador = 0;
            this.evaluacionService.getItemEspecialeEvaluacion(evaluacion.codigo).subscribe(itemEspeciales => {
              evaluacion.itemEspeciales = itemEspeciales;
              // itemEspeciales.forEach(r => {
                // if (r['importante'] === true) {
                  // this.contador += 0;
                // }
              // });
            }, (error) => {
              this.spinner.hide();
              throwError('Ha fallado la carga de datos, revisar conexión de internet');
            }, () => {
            // tslint:disable-next-line:prefer-const
            this.bloqueadosService.cargarHistorial(evaluacion.codigo).subscribe(
              historial => {
                evaluacion.historial = historial;
              }, (error) => {
                this.spinner.hide();
                throwError('Ha fallado la carga de datos, revisar conexión de internet');
              }, () => {
                let imagenes: Imagen[] = [];
                this.iterable.forEach(element => {
                  if (evaluacion.foto[element] !== null && evaluacion.foto[element] !== '') {
                    imagenes.push(new Imagen(evaluacion.area.foto[element], evaluacion.foto[element]));
                    console.log(evaluacion.foto[element]);
                  }
                  if (element === 9) {
                    this.dataSourceImagenes = new MatTableDataSource(imagenes);
                  }
                });
                evaluacion.itemsEvaluados = listaItemEvaluacion;
                this.dataSourceEvaluacion = new MatTableDataSource(evaluacion.itemsEvaluados);
                this.dataSourceEvaluacion.paginator = this.paginatorVistaEvaluacion;
                this.dataSourceEvaluacion.sort = this.sortVistaEvaluacion;
                this.evaluacion = evaluacion;
                console.log(evaluacion);
                this.seActivo = true;
                this.spinner.hide();
              });
            });
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
                    <div class="table-responsive">`;
          imprimir += '<table class="table table-condensed">';
          imprimir += `<thead>
                          <tr id="top">
                              <th><strong>Item</strong></th>
                              <th><strong>Definición</strong></th>
                              <th><strong>Cumple</strong></th>
                          </tr>
                      </thead>
                      <tbody>`;
            evaluacion.itemsEvaluados.forEach(item => {
              imprimir += `<tr>
                              <td><strong>${item.itemNombre}</strong></td>
                              <td>${item.definicion}</td>
                              <td>${(item.evaluacion === 1) ? 'Si' : 'No'}</td>
                          </tr>`;
            });
    imprimir += `       <tbody>
                      </table>
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
          </style>
        </head>
    <body onload="window.print();window.close()">${imprimir}</body>
      </html>`
    );
    popupWin.document.close();
  }
  cancelar() {
    this.abrir = false;
    this.seActivo = false;
    this.evaluacion = new Evaluacion();
    this.dataSourceEvaluacion = new MatTableDataSource(this.evaluacion.itemsEvaluados);
    this.dataSourceEvaluacion.paginator = this.paginatorVistaEvaluacion;
    this.dataSourceEvaluacion.sort = this.sortVistaEvaluacion;
  }
}
