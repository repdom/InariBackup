import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EvaluacionService } from '../../services/evaluacion/evaluacion.service';
import { ItemEvaluacionService } from 'src/app/services/evaluacion/item-evaluacion.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Area, FormularioModelo } from '../../clases/formulario/formulario';
import { throwError } from 'rxjs';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import { Colaborador } from '../../clases/formulario/colaborador';
import { DatePipe } from '@angular/common';

export class ItemEvaluacion {
  codigo = 0;
  fechaCreacion = '';
  fechaGuardado = '';
  fechaGuardadoCompleta = '';
  evaluacion = 0;
  comentario = '';
  formularioEvaluacionCodigo = 0;
  imagen = '';
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
  area: Area;
  administradorDeArea = '';
  areaNombre = '';
  nombreEvaluador = '';
  evaluador: Colaborador;
  foto1 = '';
  foto2 = '';
  foto3 = '';
  foto4 = '';
  foto5 = '';
  foto6 = '';
  foto7 = '';
  foto8 = '';
  foto9 = '';
  foto10 = '';
  itemsEvaluados: ItemEvaluacion[] = [];
  fechaCompletaCreacion = '';
  fechaCompletaGuardado = '';
}

@Component({
  selector: 'app-listar-evaluacion',
  templateUrl: './listar-evaluacion.component.html',
  styleUrls: ['./listar-evaluacion.component.scss']
})
export class ListarEvaluacionComponent implements OnInit {
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
                            'fechaGuardado',
                            'evaluacion',
                            'comentario',
                            'imagen'
                          ];
  dataSource: MatTableDataSource<Evaluacion>;
  dataSourceEvaluacion: MatTableDataSource<ItemEvaluacion>;
  listaEvaluacion: Evaluacion[] = [];

  @ViewChild('tableEvaluacionPaginator') paginatorEvaluacion: MatPaginator;
  @ViewChild('tableSortVistaFormularioEvaluado') sortEvaluacion: MatSort;

  @ViewChild('tablePaginatorVistaFormularioEvaluacion') paginatorVistaEvaluacion: MatPaginator;
  @ViewChild('tableSortVistaFormularioEvaluado') sortVistaEvaluacion: MatSort;

  constructor(private evaluacionService: EvaluacionService,
              private itemEvaluacionService: ItemEvaluacionService,
              private colaboradoresService: ColaboradorService,
              public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              private cookieService: CookieService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.listarEvaluaciones();
  }

  listarEvaluaciones() {
    this.spinner.show();
    this.evaluacionService.getAll().subscribe(responseEvaluacion => {
      responseEvaluacion.forEach(elementEvaluacion => {
        // tslint:disable-next-line:prefer-const
        let evaluacion: Evaluacion = {
          codigo: elementEvaluacion['codigo'],
          fechaCreacion: elementEvaluacion['fechaCreacion'],
          fechaGuardado: elementEvaluacion['fechaGuardado'],
          usuarioRelacionado: elementEvaluacion['usuarioRelacionado'],
          formularioModeloCodigo: elementEvaluacion['formularioModeloCodigo'],
          areaCodigo: elementEvaluacion['areaCodigo'],
          foto1: elementEvaluacion['foto1'],
          foto2: elementEvaluacion['foto2'],
          foto3: elementEvaluacion['foto3'],
          foto4: elementEvaluacion['foto4'],
          foto5: elementEvaluacion['foto5'],
          foto6: elementEvaluacion['foto6'],
          foto7: elementEvaluacion['foto7'],
          foto8: elementEvaluacion['foto8'],
          foto9: elementEvaluacion['foto9'],
          foto10: elementEvaluacion['foto10'],
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
        this.evaluacionService.getRelation(elementEvaluacion['codigo'], 'formularioEvaluacionArearel').subscribe(responseArea => {
          // tslint:disable-next-line:prefer-const
          area.nombre = responseArea['nombre'];
          area.foto[0] = responseArea['foto1'];
          area.foto[1] = responseArea['foto2'];
          area.foto[2] = responseArea['foto3'];
          area.foto[3] = responseArea['foto4'];
          area.foto[4] = responseArea['foto5'];
          area.foto[5] = responseArea['foto6'];
          area.foto[6] = responseArea['foto7'];
          area.foto[7] = responseArea['foto8'];
          area.foto[8] = responseArea['foto9'];
          area.foto[9] = responseArea['foto10'];
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
            return throwError('Ha fallado la carga de datos, revisar conexión de internet');
          }, () => {
            // tslint:disable-next-line:max-line-length
            evaluacion.administradorDeArea = area.administrador.primerNombre + ' ' + area.administrador.segundoNombre + ' ' + area.administrador.primerApellido;
          });
        }, (error) => {
          return throwError('Ha fallado la carga de datos, revisar conexión de internet');
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
          return throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.formulario = formularioModelo;
          evaluacion.formularioNombre = formularioModelo.nombre;
        });
        // tslint:disable-next-line:prefer-const
        let listaItemEvaluacion: ItemEvaluacion[] = [];
        this.itemEvaluacionService.getAllWhere(elementEvaluacion['codigo'], 'formularioEvaluacionCodigo').subscribe(responseItem => {
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
                console.log(itemNoEvaluacionResponse);
                nombreItem = itemNoEvaluacionResponse['nombre'];
                definicion = itemNoEvaluacionResponse['definicion'];
              }, (error) => {
                return throwError('Ha fallado la carga de datos, revisar conexión de internet');
              }, () => {
                itemEvaluacion.itemNombre = nombreItem;
                itemEvaluacion.definicion = definicion;
                // tslint:disable-next-line:max-line-length
                itemEvaluacion.fechaGuardadoCompleta = new DatePipe('es-ES').transform(elementEvaluacion['fechaGuardado'], 'MMMM d, y, h:mm:ss');
              });
            listaItemEvaluacion.push(itemEvaluacion);
          });
        }, (error) => {
          return throwError('Ha fallado la carga de datos, revisar conexión de internet');
        }, () => {
          evaluacion.itemsEvaluados = listaItemEvaluacion;
        });
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
          return throwError('Ha fallado la carga de datos, revisar conexión de internet');
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
    }, (error) => {
      this.spinner.hide();
      return throwError('Ha fallado la carga de datos, revisar conexión de internet');
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
    this.dataSourceEvaluacion = new MatTableDataSource(evaluacion.itemsEvaluados);
    this.dataSourceEvaluacion.paginator = this.paginatorVistaEvaluacion;
    this.dataSourceEvaluacion.sort = this.sortVistaEvaluacion;
  }
}
