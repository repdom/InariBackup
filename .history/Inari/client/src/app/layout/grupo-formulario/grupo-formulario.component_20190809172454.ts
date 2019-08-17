import { Component, OnInit, ViewChild } from '@angular/core';
import { GrupoItem } from '../item/item.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-grupo-formulario',
  templateUrl: './grupo-formulario.component.html',
  styleUrls: ['./grupo-formulario.component.scss']
})
export class GrupoFormularioComponent implements OnInit {
  public items: GrupoItem[] = [];
  public nuevoItem: GrupoItem = new GrupoItem();
  dataSource: MatTableDataSource<GrupoItem>;
  actualizar = false;
  displayedColumns = ['nombre', 'definicion', 'acciones'];
  grupos: GrupoItem[] = [];
  gruposItem = [
    'Edificios',
    'Áreas',
    'Servicios',
    'Residuos',
    'Equipos LyM',
    'Compras',
    'Contaminación',
    'Lim y Desinf',
    'Plagas',
    'Higiene',
    'Retrabajo',
    'Recall',
    'Almacén',
    'Etiqueta',
    'Defensa',
    'PPR Op',
    'PCC',
    'Sistema',
  ];
  public seleccionado = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemService: ItemService,
              private changeDetectorRefs: ChangeDetectorRef,
              private spinner: NgxSpinnerService,
              private grupoService: GruposService) { }

  ngOnInit() {
    this.listarItems();
    this.listarGrupos();
  }

  listarItems() {
    this.spinner.show();
    this.itemService.getAll().subscribe(itemResponse => {
      itemResponse.forEach(elementResponse => {
        if (elementResponse['cancelado'] === 0) {
          const item: Item = {
            cancelado: elementResponse['cancelado'],
            codigo: elementResponse['codigo'],
            definicion: elementResponse['definicion'],
            fechaCreacion: elementResponse['fechaCreacion'],
            nombre: elementResponse['nombre'],
            alias: elementResponse['alias'],
            codigoGrupo: elementResponse['grupoCodigo']
          };
          this.items.push(item);
          this.dataSource = new MatTableDataSource(this.items);
          this.changeDetectorRefs.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    }, (error) => {
      this.spinner.hide();
      return throwError('Revise conexión a internet');
    }, () => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource(this.items);
      this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  listarGrupos() {
    this.grupoService.getAll().subscribe(r => {
      this.grupos = r;
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

  guardarItem() {
    if (this.nuevoItem.nombre.length > 0 &&
        this.nuevoItem.definicion.length > 0) {
      const d2 = new Date();
      const d = new Date(d2.getTime());
      const fechaCreacion = formatDate(new Date(d), 'yyyy-MM-dd', 'en-US');

      const itemAgregado = {
        codigo: 0,
        nombre: this.nuevoItem.nombre,
        fechaCreacion: fechaCreacion,
        cancelado: 0,
        definicion: this.nuevoItem.definicion,
        alias: this.nuevoItem.alias,
        grupoCodigo: this.nuevoItem.codigoGrupo
      };

      const auxItem = this.nuevoItem;
      this.nuevoItem = new Item();

      const index = this.items.push(auxItem);

      this.itemService.create(itemAgregado).subscribe(itemResponse => {
        this.items[index - 1].codigo = itemResponse['codigo'];
      }, (error) => {
        this.items.pop();
        this.nuevoItem = auxItem;
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo malo sucedió, vuelva a intentarlo. Revise conexión de internet',
        });
      }, () => {
        this.dataSource.data = [];
        this.dataSource.data = this.items;
        this.nuevoItem = new Item();
        swal.fire(
          'Formulario Agregado',
          '',
          'success',
        );
      });
    } else {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Algo malo sucedió, vuelva a intentarlo. Revise conexión de internet.',
      });
    }
  }
  cancelar() {
    this.actualizar = false;
    this.nuevoItem = new Item();
  }
  editarItem(item: Item) {
    this.actualizar = true;
    this.nuevoItem = item;
  }
  actualizarItem() {
    const itemActualizado = {
      codigo: this.nuevoItem.codigo,
      nombre: this.nuevoItem.nombre,
      definicion: this.nuevoItem.definicion,
      alias: this.nuevoItem.alias,
      grupoCodigo: this.nuevoItem.codigoGrupo
    };
  // this.areaAuxActualizar = this.areaNueva;
    this.itemService.update(itemActualizado).subscribe(areaResponse => {
    }, (error) => {
      return throwError('Ha fallado el editar el área, revisar conexión de internet');
    }, () => {
      this.nuevoItem = new Item();
      this.actualizar = false;
      swal.fire(
        'Item actualizado corectamente',
        '',
        'success',
      );
    });
  }
  eliminarArea(item: Item) {
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
        const itemEliminado = {
          codigo: item.codigo,
          cancelado: 1
        };
        this.itemService.update(itemEliminado).subscribe(updatedUserResponse => {
        }, (error) => {
          return throwError('Ha fallado el eliminar el area, revisar conexión de internet');
        }, () => {
          this.items.splice(this.items.findIndex(i => i.codigo === item.codigo), 1);
          this.dataSource.data = [];
          this.dataSource.data = this.items;
          swal.fire(
            '!Eliminado con exito¡',
            'El Item ha sido eliminado.',
            'success'
          );
        });
      }
    });
  }
}
