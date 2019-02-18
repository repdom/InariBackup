import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormularioModeloService } from '../../services/formulario/formulario-modelo.service';
import { FormularioModeloItemService } from '../../services/formulario/formulario-modelo-item.service';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { FormularioModelo } from 'src/app/clases/formulario/formulario';
import { Area, Item, FormularioModeloItem } from '../../clases/formulario/formulario';
import { AreaService } from '../../services/area/area.service';
import { FormularioDialogComponent } from './formulario-dialog/formulario-dialog.component';
import { throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';
import { ItemService } from 'src/app/services/item/item.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';


export class AreaFormularios {
  public Area: Area = new Area();
  public FormulariosModelos: FormularioModelo[] = [];
}

export class FormularioItemTable {
  // FormularioModeloItem
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit, AfterViewInit {
  displayedColumns = ['select', 'nombre', 'definicion'];
  itemDesplayedColumns = ['nombre', 'definicion', 'accion'];

  AreasFormularios: AreaFormularios[] = [];
  Items: Item[] = [];
  areas: Area[] = [];
  areasFiltradas: Area[] = [];
  FormulariosModelosItems: FormularioModeloItem[] = [];
  private formulario: FormularioModelo;
  private userID: number;
  dataSource: MatTableDataSource<Item>;
  selection: SelectionModel<Item>;
  seleccionFormulario = false;
  formularioSeleccionado: FormularioModelo = new FormularioModelo();
  pageEvent: PageEvent;
  nuevoFormularioModelo: FormularioModelo = new FormularioModelo();
  formulariosModelos: FormularioModelo[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private formularioModeloService: FormularioModeloService,
              private formularioModeloItemService: FormularioModeloItemService,
              private areaService: AreaService,
              public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              private cookieService: CookieService,
              private itemsService: ItemService,
              private spinner: NgxSpinnerService,
            ) { }

  ngOnInit() {
    /*this.formularioModeloService.getAllWhereCodigoFormulario(2, 'formulario').subscribe(response => {
      console.log(response);
    });*/
    this.selection = new SelectionModel(true, []);
    this.userID = Number(this.cookieService.get('userid'));
    this.listarAreas();
    this.listarItems();
  }

  ngAfterViewInit()  {
    this.userID = Number(this.cookieService.get('userid'));
  }

  listarRelacionFormularioModelosItems() {
    this.formularioModeloItemService.getAll().subscribe(formularioModeloItem => {
      formularioModeloItem.forEach(elementModeloItem => {
        const modeloItem: FormularioModeloItem = {
          cancelado: elementModeloItem['cancelado'],
          formularioModeloCodigo: elementModeloItem['formularioModeloCodigo'],
          itemCodigo: elementModeloItem['itemCodigo'],
          id: elementModeloItem['id']
        };
        this.FormulariosModelosItems.push(modeloItem);
      });
    });
  }

  listarItems() {
    this.itemsService.getAll().subscribe(itemResponse => {
      itemResponse.forEach(itemElement => {
          if (itemElement['cancelado'] === 0) {
            const item: Item = {
              codigo: itemElement['codigo'],
              nombre: itemElement['nombre'],
              cancelado: itemElement['cancelado'],
              fechaCreacion: itemElement['fechaCreacion'],
              definicion: itemElement['definicion']
            };
            this.Items.push(item);
            this.dataSource = new MatTableDataSource(this.Items);
            this.selection = new SelectionModel(true, []);
            this.changeDetectorRefs.detectChanges();
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        });
    }, (error) => {
      throwError(error);
    }, () => {
      this.dataSource = new MatTableDataSource(this.Items);
      this.selection = new SelectionModel(true, []);
      this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  listarAreas() {
    this.areaService.getAll().subscribe(areasResponse => {
      areasResponse.forEach(areaElement => {
        const area: Area = new Area();
        area.codigo = areaElement['codigo'];
        area.nombre = areaElement['nombre'];
        area.cancelado = areaElement['cancelado'];
        area.administrador = areaElement['administrador'];
        this.areas.push(area);
        // tslint:disable-next-line:prefer-const
        let areaFormularios: AreaFormularios = new AreaFormularios();
        areaFormularios.Area = area;
        this.formularioModeloService.getAllWhereCodigoFormulario(area.codigo, '').subscribe(formulariosModulo => {
          formulariosModulo.forEach(elementFormularioModelo => {
            const formularioModulo: FormularioModelo = {
              areaCodigo: elementFormularioModelo['areaCodigo'],
              cancelado: elementFormularioModelo['cancelado'],
              nombre: elementFormularioModelo['nombre'],
              codigo: elementFormularioModelo['codigo'],
              fechaCreacion: elementFormularioModelo['fechaCreacion'],
              usuarioRelacionado: elementFormularioModelo['usuarioRelacionado']
            };
            areaFormularios.FormulariosModelos.push(formularioModulo);
          });
        }, (error) => {
          return throwError(error);
        }, () => {
          this.AreasFormularios.push(areaFormularios);
        });
      });
    }, (error) => {
      return throwError(error);
    }, () => {
      this.areasFiltradas = this.areas.filter(a => a.cancelado === 0);
    });
  }

  vincularFormularioModuloItem(formularioModulo: FormularioModelo) {
    this.formularioSeleccionado = formularioModulo;
    this.seleccionFormulario = true;
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
          // console.log();
    }
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    cancelarAgregarItem() {
      this.seleccionFormulario = false;
    }
    guardarFormulario() {
      this.spinner.show();
      const itemsSeleccionados = this.selection.selected;
      const d2 = new Date();
      const d = new Date(d2.getTime());
      const fechaCreacion = formatDate(new Date(d), 'yyyy-MM-dd', 'en-US');
      console.log(this.selection.selected);
      const formularioAgregado = {
          codigo: this.nuevoFormularioModelo.codigo,
          nombre: this.nuevoFormularioModelo.nombre,
          fechaCreacion: fechaCreacion,
          cancelado: this.nuevoFormularioModelo.cancelado,
          areaCodigo: this.nuevoFormularioModelo.areaCodigo,
          usuarioRelacionado: this.userID,
      };

      this.nuevoFormularioModelo.items = itemsSeleccionados;
      const formularioAux = this.nuevoFormularioModelo;
      const indice = this.formulariosModelos.push(formularioAux);
      this.formularioModeloService.create(formularioAgregado).subscribe(formularioResponse => {
        this.formulariosModelos[indice - 1].codigo = formularioResponse['codigo'];
        this.nuevoFormularioModelo.codigo = formularioResponse['codigo'];
      }, (error) => {
        this.spinner.hide();
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Hubo un error en crear el formulario. Revise conexión a internet.',
        });
      }, () => {
        let i = 0;
        this.nuevoFormularioModelo.items.forEach(itemResponse => {
          const itemFormulario = {
            id: 0,
            formularioModeloCodigo: this.nuevoFormularioModelo.codigo,
            itemCodigo: itemResponse.codigo,
            cancelado: 0
          };
          this.formularioModeloItemService.create(itemFormulario).subscribe(itemFormularioItem => {
          }, (error) => {
            this.spinner.hide();
            swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Hubo un error en crear el formulario. Revise conexión a internet.',
            });
          }, () => {
          });
          i += 1;
        });
        this.spinner.hide();
        this.selection.clear();
        this.nuevoFormularioModelo = new FormularioModelo();
        swal.fire(
          'Formulario agregado',
          '',
          'success',
        );
      });
    }
  }
