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
  displayedColumns = ['select', 'nombre'];
  itemDesplayedColumns = ['nombre', 'accion'];
  txtNombreArea: string = '';
  txtNombreItem: string = '';

  dataLoteria: MatTableDataSource<FormularioModelo>;
  AreasFormularios: AreaFormularios[] = [];
  Items: Item[] = [];
  FormulariosModelosItems: FormularioModeloItem[] = [];
  private formulario: FormularioModelo;
  private userID: number;
  dataSource: MatTableDataSource<Item>;
  itemDatasource: MatTableDataSource<Item>;
  selection: SelectionModel<Item>;
  seleccionFormulario = false;
  formularioSeleccionado: FormularioModelo = new FormularioModelo();
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  @ViewChild('sortItem') sortItem: MatSort;


  constructor(private formularioModeloService: FormularioModeloService,
              private formularioModeloItemService: FormularioModeloItemService,
              private areaService: AreaService,
              public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              private cookieService: CookieService,
              private itemsService: ItemService
            ) { }

  ngOnInit() {
    /*this.formularioModeloService.getAllWhereCodigoFormulario(2, 'formulario').subscribe(response => {
      console.log(response);
      this.userID = Number(this.cookieService.get('userid'));
    });*/
    this.selection = new SelectionModel(true, []);
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

  abrirConfiguracion(area: AreaFormularios) {
    const dialogRef = this.dialog.open(FormularioDialogComponent, {
      width: '250px',
      height: '280px',
      data: {
        codigo: area.Area.codigo,
        nombre: area.Area.nombre,
        cancelado: area.Area.cancelado
      }
    });
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado !== undefined) {
        this.formulario = resultado;
        console.log(this.formulario);
        const d2 = new Date();
        const d = new Date(d2.getTime());
        const fechaCreacion = formatDate(new Date(d), 'yyyy-MM-dd', 'en-US');

        const formularioModelo = {
          codigo: 0,
          nombre: this.formulario.nombre,
          fechaCreacion: fechaCreacion,
          cancelado: 0,
          areaCodigo: area.Area.codigo,
          usuarioRelacionado: this.userID,
        };

        const nombreAux = this.formulario.nombre;
        const indice = area.FormulariosModelos.push(formularioModelo);
        // this.formularioNuevo.nombre = '';
        // swal.showLoading();

        this.formularioModeloService.create(formularioModelo).subscribe(formularioModeloResponse => {
          area.FormulariosModelos[indice - 1].codigo = formularioModeloResponse['codigo'];
          area.FormulariosModelos[indice - 1].codigo = formularioModeloResponse['codigo'];
        }, (error) => {
          area.FormulariosModelos.pop();
          this.formulario.nombre = nombreAux;
          swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Algo malo sucedió, vuelva a intentarlo. Revise conexión de internet',
          });
          // swal.hideLoading();
        }, () => {
            swal.fire(
              'Formulario Agregado',
              '',
              'success',
            );
            // this.formularioNuevo = new FormularioModelo();
        });
        }
      });
    }

  listarItems() {
    this.itemsService.getAll().subscribe(itemResponse => {
      itemResponse.forEach(itemElement => {
        const item: Item = {
          codigo: itemElement['codigo'],
          nombre: itemElement['nombre'],
          cancelado: itemElement['cancelado'],
          fechaCreacion: itemElement['fechaCreacion']
        };
         this.Items.push(item);
        this.dataSource = new MatTableDataSource(this.Items);
        this.selection = new SelectionModel(true, []);
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.itemDatasource = new MatTableDataSource(this.Items);
        this.changeDetectorRefs.detectChanges();
        this.itemDatasource.sort = this.sortItem;
        });
    }, (error) => {
      throwError(error);
    }, () => {
      this.dataSource = new MatTableDataSource(this.Items);
      this.selection = new SelectionModel(true, []);
      this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.itemDatasource = new MatTableDataSource(this.Items);
      this.changeDetectorRefs.detectChanges();
      this.itemDatasource.sort = this.sortItem;
    });
  }

  listarAreas() {
    this.areaService.getAll().subscribe(areasResponse => {
      areasResponse.forEach(areaElement => {
        const area: Area = {
          codigo: areaElement['codigo'],
          nombre: areaElement['nombre'],
          cancelado: areaElement['cancelado']
        };

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
    });
  }

  agregarItem() {
    if (this.txtNombreItem.length > 0) {
      const d2 = new Date();
      const d = new Date(d2.getTime());
      const fechaCreacion = formatDate(new Date(d), 'yyyy-MM-dd', 'en-US');

      const itemAgregado = {
        codigo: 0,
        nombre: this.txtNombreItem,
        fechaCreacion: fechaCreacion,
        cancelado: 0
      };

      const nombreItem = this.txtNombreItem;
      this.txtNombreItem = '';

      const index = this.Items.push(itemAgregado);

      this.itemsService.create(itemAgregado).subscribe(itemResponse => {
        this.Items[index - 1].codigo = itemResponse['codigo'];
      }, (error) => {
        this.Items.pop();
        this.txtNombreItem = nombreItem;
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo malo sucedió, vuelva a intentarlo. Revise conexión de internet',
        });
      }, () => {
        this.dataSource.data = [];
        this.dataSource.data = this.Items;
        this.itemDatasource.data = [];
        this.itemDatasource.data = this.Items;
        this.txtNombreItem = '';
        swal.fire(
          'Formulario Agregado',
          '',
          'success',
        );
      });
    }
  }

  vincularFormularioModuloItem(formularioModulo: FormularioModelo) {
    this.formularioSeleccionado = formularioModulo;
    this.seleccionFormulario = true;
  }

  agregarArea() {
    if (this.txtNombreArea.length > 0) {
      const areaAgregada = {
        codigo: 0,
        nombre: this.txtNombreArea,
        cancelado: 0,
      };

      const nombreArea = this.txtNombreArea;
      const ultimoElemento = this.AreasFormularios.push(
        {
          Area: {
            codigo: 0,
            nombre: this.txtNombreArea,
            cancelado: 0,
          },
          FormulariosModelos: []
        });
        this.txtNombreArea = '';
      this.areaService.create(areaAgregada).subscribe(areaResponse => {
        this.AreasFormularios[ultimoElemento - 1].Area.codigo = areaResponse['codigo'];
        this.AreasFormularios[ultimoElemento - 1].Area.cancelado = areaResponse['cancelado'];
        this.txtNombreArea = '';
      }, (error) => {
        this.Items.pop();
        this.txtNombreArea = nombreArea;
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo malo sucedió, vuelva a intentarlo. Revise conexión de internet',
        });
      }, () => {
        swal.fire(
          'Formulario Agregado',
          '',
          'success',
        );
      });
    }
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
  }
