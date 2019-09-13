import { ItemComponent } from './../item/item.component';
import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormularioModeloService } from '../../services/formulario/formulario-modelo.service';
import { FormularioModeloItemService } from '../../services/formulario/formulario-modelo-item.service';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { FormularioModelo, ItemCombinado } from 'src/app/clases/formulario/formulario';
import { Area, Item, FormularioModeloItem } from '../../clases/formulario/formulario';
import { AreaService } from '../../services/area/area.service';
import { FormularioDialogComponent } from './formulario-dialog/formulario-dialog.component';
import { throwError, config } from 'rxjs';
import { formatDate } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';
import { ItemService } from 'src/app/services/item/item.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';


export class AreaFormularios {
  public FormulariosModelos: FormularioModelo[] = [];
  public FormularioItemModelo?: FormularioModeloItem[] = [];
}

export class FormularioItemCombinado {
  itemCombinado: ItemCombinado[] = [];
  formularioModelo: FormularioModelo = new FormularioModelo();

  optenerItems() {
    // tslint:disable-next-line:prefer-const
    let items: Item [] = [];
    this.itemCombinado.forEach(r => {
      items.push(r.item);
    });
    return items;
  }
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
  formularioModeloDisplayedColumns = ['nombre', 'cantidad', 'accion'];

  AreasFormularios: AreaFormularios[] = [];
  Items: Item[] = [];
  FormulariosModelosItems: FormularioModeloItem[] = [];
  private formulario: FormularioModelo;
  private userID: number;
  dataSource: MatTableDataSource<Item>;
  dataSourceFormularioModelo: MatTableDataSource<FormularioItemCombinado>;
  selection: SelectionModel<Item>;
  seleccionFormulario = false;
  formularioSeleccionado: FormularioModelo = new FormularioModelo();
  pageEvent: PageEvent;
  nuevoFormularioModelo: FormularioModelo = new FormularioModelo();
  formulariosModelos: FormularioModelo[] = [];
  itemFormularioCombinado: FormularioItemCombinado[] = [];
  actualizarFormulario = false;
  formularioModeloAuxiliar: FormularioItemCombinado = new FormularioItemCombinado();
  itemsAux: Item[] = [];
  rol: string;

  @ViewChild('tableItemPaginator') paginator: MatPaginator;
  @ViewChild('tableItemSort') sort: MatSort;

  @ViewChild('tableFormularioModeloPaginator') paginatorFormularioModelo: MatPaginator;
  @ViewChild('tableSortFormularioModelo') sortFormularioModelo: MatSort;

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
    this.rol = this.cookieService.get('role');
    this.selection = new SelectionModel(true, []);
    // this.userID = Number(this.cookieService.get('userid'));
    this.listarFormularioItem();
    this.listarItems();
  }

  ngAfterViewInit()  {
    // this.userID = Number(this.cookieService.get('userid'));
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
              definicion: itemElement['definicion'],
              optenidoDesdeApi: false
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
      this.spinner.hide();
    }, () => {
      this.dataSource = new MatTableDataSource(this.Items);
      this.selection = new SelectionModel(true, []);
      this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.spinner.hide();
    });
  }

  listarFormularioItem() {
        this.spinner.show();
        this.formularioModeloService.getAll().subscribe(formulariosModelo => {
          formulariosModelo.forEach(elementFormularioModelo => {
            if (elementFormularioModelo['cancelado'] === 0) {
              const formularioModulo: FormularioModelo = {
                cancelado: elementFormularioModelo['cancelado'],
                nombre: elementFormularioModelo['nombre'],
                codigo: elementFormularioModelo['codigo'],
                fechaCreacion: elementFormularioModelo['fechaCreacion'],
              };
              // tslint:disable-next-line:prefer-const
              let formularioItemCombinado = new FormularioItemCombinado();
              formularioItemCombinado.formularioModelo = formularioModulo;
              // tslint:disable-next-line:prefer-const
              let itemCombinado: ItemCombinado = new ItemCombinado();
              // tslint:disable-next-line:max-line-length
              this.formularioModeloItemService.getAllWhereCodigoFormularioModelo(elementFormularioModelo['codigo'], 'FormularioModelo').subscribe(formularioItemResponse => {
                formularioItemResponse.forEach(elementItemModeloResponse => {
                  if (elementItemModeloResponse['cancelado'] === 0) {
                  const formularioModeloItem: FormularioModeloItem = {
                    formularioModeloCodigo: elementItemModeloResponse['formularioModeloCodigo'],
                    itemCodigo: elementItemModeloResponse['itemCodigo'],
                    cancelado: elementItemModeloResponse['cancelado'],
                    id: elementItemModeloResponse['id'],
                  };
                  // console.log(elementItemModeloResponse);
                  // console.log(elementItemModeloResponse['itemCodigo']);
                  this.itemsService.getFromCode(elementItemModeloResponse['itemCodigo']).subscribe(elementItem => {
                    // console.log(elementItem);
                    const item: Item = {
                      codigo: elementItem['codigo'],
                      nombre: elementItem['nombre'],
                      fechaCreacion: elementItem['fechaCreacion'],
                      cancelado: elementItem['cancelado'],
                      definicion: elementItem['definicion'],
                      optenidoDesdeApi: true,
                    };
                    itemCombinado.formularioModeloItem = formularioModeloItem,
                    itemCombinado.item = item;
                    // console.log(itemCombinado);
                  }, (error) => {
                    swal.fire({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Hubo un error en la carga de los formulario. Revise conexión a internet.',
                    });
                    this.spinner.hide();
                  }, () => {
                    // console.log(itemCombinado);
                    formularioItemCombinado.itemCombinado.push(itemCombinado);
                    itemCombinado = new ItemCombinado();
                  });
                  }
                });
              }, (error) => {
                swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Hubo un error en la carga de los formulario. Revise conexión a internet.',
                });
                this.spinner.hide();
              }, () => {
                console.log(formularioItemCombinado);
                this.itemFormularioCombinado.push(formularioItemCombinado);
                this.dataSourceFormularioModelo = new MatTableDataSource(this.itemFormularioCombinado);
                this.changeDetectorRefs.detectChanges();
                this.dataSourceFormularioModelo.paginator = this.paginatorFormularioModelo;
                this.dataSourceFormularioModelo.sort = this.sortFormularioModelo;
                this.spinner.hide();
              });
              // areaFormularios.FormulariosModelos.push(formularioModulo);
            }
          });
        }, (error) => {
          return throwError(error);
        }, () => {
          // this.AreasFormularios.push(areaFormularios);
          this.spinner.hide();
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
      this.spinner.hide();
      this.nuevoFormularioModelo = new FormularioModelo();
      if (this.actualizarFormulario === true) {
        this.Items = this.itemsAux;
        this.actualizarFormulario = false;
      }
      this.selection.clear();
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
      };

      this.nuevoFormularioModelo.items = itemsSeleccionados;
      const formularioAux = this.nuevoFormularioModelo;
      const indice = this.formulariosModelos.push(formularioAux);
      // this.dataSourceFormularioModelo.data = [];
      // this,this.dataSourceFormularioModelo.data = this.formulariosModelos;
      const formularioCombinadoAux: FormularioItemCombinado = new FormularioItemCombinado();
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
          // tslint:disable-next-line:prefer-const
          let itemCombinado: ItemCombinado = new ItemCombinado();
          itemCombinado.item = itemResponse;
          itemCombinado.formularioModeloItem = {
            cancelado: 0,
            formularioModeloCodigo: this.nuevoFormularioModelo.codigo,
            itemCodigo: itemResponse.codigo,
            id: 0,
          };
          this.formularioModeloItemService.create(itemFormulario).subscribe(itemFormularioItem => {
            itemCombinado.formularioModeloItem.id = itemFormularioItem['id'];
          }, (error) => {
            this.spinner.hide();
            swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Hubo un error en crear el formulario. Revise conexión a internet.',
            });
          }, () => {
            formularioCombinadoAux.itemCombinado.push(itemCombinado);
            if (i === this.nuevoFormularioModelo.items.length - 1) {
              this.spinner.hide();
            }
            i += 1;
          });
        });
        formularioCombinadoAux.formularioModelo = formularioAux;
        this.itemFormularioCombinado.push(formularioCombinadoAux);
        this.dataSourceFormularioModelo.data = [];
        this.dataSourceFormularioModelo.data = this.itemFormularioCombinado;
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
    cargarActualizarFormulario(formularioItemCombinado: FormularioItemCombinado) {
      // formularioItemCombinado.optenerItems().forEach(r => r.codigo === )
      this.spinner.show();
      this.actualizarFormulario = true;
      this.itemsAux = this.Items;
      if (formularioItemCombinado.itemCombinado.length > 0) {
        this.Items.map(item => {
            // console.log(item);
            const itemAux = formularioItemCombinado.itemCombinado.find(r => r.item.codigo === item.codigo);
            if (itemAux !== undefined) {
              item.optenidoDesdeApi = itemAux.item.optenidoDesdeApi;
            }
            return item;
        });
      }
      // console.log(formularioItemCombinado);
      this.dataSource = new MatTableDataSource(this.Items);
      this.selection = new SelectionModel(true, []);
      this.dataSource.paginator = this.paginator;
      // this.paginator = this.dataSource.paginator;
      formularioItemCombinado.itemCombinado.forEach(row => {
                      this.selection.select(this.Items.find(r => r.codigo === row.item.codigo));
      });
      this.nuevoFormularioModelo = formularioItemCombinado.formularioModelo;
      this.formularioModeloAuxiliar = formularioItemCombinado;
      // console.log(this.Items);
      this.spinner.hide();
    }

    actualizarFormularioEnBaseDeDatos() {
      this.spinner.show();
      const itemsSeleccionados = this.selection.selected;
      const formulario = {
        codigo: this.nuevoFormularioModelo.codigo,
        nombre: this.nuevoFormularioModelo.nombre,
      };
      const indice = this.itemFormularioCombinado.findIndex(r => r.formularioModelo.codigo === this.nuevoFormularioModelo.codigo);
      const formularioNombreAux = this.itemFormularioCombinado[indice].formularioModelo.nombre;
      this.itemFormularioCombinado[indice].formularioModelo.nombre = formulario.nombre;
      this.formularioModeloService.update(formulario).subscribe(formularioResponse => {
        this.Items.forEach(itemResponse => {
          if (itemResponse.optenidoDesdeApi === true) {
            const esSelecionado = this.selection.isSelected(itemResponse);
            if (esSelecionado === false) {
              // tslint:disable-next-line:max-line-length
              const itemCombinado = this.itemFormularioCombinado[indice].itemCombinado.findIndex(iCombinado => iCombinado.item.codigo === itemResponse.codigo);
              const itemActualizar = {
                id: this.itemFormularioCombinado[indice].itemCombinado[itemCombinado].formularioModeloItem.id,
                cancelado: 1
              };
              this.formularioModeloItemService.updateWithID(itemActualizar).subscribe(response => {

              }, (error) => {
                console.log(error);
                swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Hubo un error en actualizar el formulario. Revise conexión a internet.',
                });
                this.spinner.hide();
              }, () => {
                this.itemFormularioCombinado[indice].itemCombinado.splice(itemCombinado, 1);
              });
            }
          }
        });
      }, (error) => {
        this.itemFormularioCombinado[indice].formularioModelo.nombre = formularioNombreAux;
          swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Hubo un error en actualizar el formulario. Revise conexión a internet.',
          });
          this.spinner.hide();
        }, () => {
          // tslint:disable-next-line:prefer-const
          let itemsCombinados: ItemCombinado[] = [];
          itemsSeleccionados.forEach(itemResponse => {
            if (itemResponse.optenidoDesdeApi === false) {
              const itemFormulario = {
                id: 0,
                formularioModeloCodigo: this.nuevoFormularioModelo.codigo,
                itemCodigo: itemResponse.codigo,
                cancelado: 0
              };
              this.formularioModeloItemService.create(itemFormulario).subscribe(r => {
                itemFormulario.id = r['id'];
                const item: Item = {
                  codigo: itemResponse.codigo,
                  nombre: itemResponse.nombre,
                  fechaCreacion: itemResponse.fechaCreacion,
                  cancelado: itemResponse.cancelado,
                  definicion: itemResponse.definicion,
                  optenidoDesdeApi: true,
                };
                const formularioModeloItem: FormularioModeloItem = {
                  formularioModeloCodigo: itemFormulario.formularioModeloCodigo,
                  itemCodigo: itemFormulario.itemCodigo,
                  cancelado: itemFormulario.cancelado,
                  id: itemFormulario.id,
                };
                this.itemFormularioCombinado[indice].itemCombinado.push({
                  item: item,
                  formularioModeloItem: formularioModeloItem
                });
              }, (error) => {
                swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Hubo un error en crear el formulario. Revise conexión a internet.',
                });
                this.spinner.hide();
              }, () => {
              });
            }
          });
          this.spinner.hide();
          this.nuevoFormularioModelo = new FormularioModelo();
          this.Items = this.itemsAux;
          this.actualizarFormulario = false;
          this.selection.clear();
          swal.fire(
            'Formulario Actualizado',
            '',
            'success',
          );
        });
    }
    eliminarFormulario(formularioItemCombinado: FormularioItemCombinado) {
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
          const formularioActualizada = {
            codigo: formularioItemCombinado.formularioModelo.codigo,
            cancelado: 1
          };
          this.formularioModeloService.update(formularioActualizada).subscribe(updatedUserResponse => {
          }, (error) => {
            return throwError('Ha fallado el eliminar el area, revisar conexión de internet');
          }, () => {
            this.itemFormularioCombinado.splice(
              this.itemFormularioCombinado.findIndex(
                f => f.formularioModelo.codigo === formularioItemCombinado.formularioModelo.codigo), 1
              );
            this.dataSourceFormularioModelo.data = [];
            this.dataSourceFormularioModelo.data = this.itemFormularioCombinado;
            swal.fire(
              '!Eliminado con exito¡',
              'El formulario ha sido eliminado.',
              'success'
            );
          });
        }
      });
    }
  }
