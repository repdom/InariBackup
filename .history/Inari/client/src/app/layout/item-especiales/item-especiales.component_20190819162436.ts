import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ItemEspecialesService } from '../../services/itemEspeciales/item-especiales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import swal from 'sweetalert2';

export class ItemEspeciales {
  codigo: number = 0;
  nombre: string = '';
  descripcion: string = '';
  importante: boolean = false;
}

@Component({
  selector: 'app-item-especiales',
  templateUrl: './item-especiales.component.html',
  styleUrls: ['./item-especiales.component.scss']
})
export class ItemEspecialesComponent implements OnInit {
  public items: ItemEspeciales[] = [];
  public nuevoItem: ItemEspeciales = new ItemEspeciales();
  dataSource: MatTableDataSource<ItemEspeciales>;
  actualizar = false;
  displayedColumns = ['nombre', 'descripcion', 'acciones'];
  public seleccionado = '';
  public rol: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private spinner: NgxSpinnerService,
              private itemEspecialesService: ItemEspecialesService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.rol = this.cookieService.get('role');
    this.listarItems();
  }

  listarItems() {
    this.spinner.show();
    this.itemEspecialesService.getAll().subscribe(itemResponse => {
      itemResponse.forEach(elementResponse => {
        // if (elementResponse['cancelado'] === 0) {
          const item: ItemEspeciales = {
            codigo: elementResponse['codigo'],
            descripcion: elementResponse['descripcion'],
            importante: elementResponse['importante'],
            nombre: elementResponse['nombre'],
          };
          this.items.push(item);
          this.dataSource = new MatTableDataSource(this.items);
          this.changeDetectorRefs.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        // }
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
        this.nuevoItem.descripcion.length > 0) {
      // const d2 = new Date();
      // const d = new Date(d2.getTime());
      // const fechaCreacion = formatDate(new Date(d), 'yyyy-MM-dd', 'en-US');

      const itemAgregado = {
        nombre: this.nuevoItem.nombre,
        descripcion: this.nuevoItem.descripcion,
        importante: this.nuevoItem.importante,
      };

      const auxItem = this.nuevoItem;
      this.nuevoItem = new ItemEspeciales();

      const index = this.items.push(auxItem);

      this.itemEspecialesService.create(itemAgregado).subscribe(itemResponse => {
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
        this.nuevoItem = new ItemEspeciales();
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
    this.nuevoItem = new ItemEspeciales();
  }
  editarItem(item: ItemEspeciales) {
    this.actualizar = true;
    this.nuevoItem = item;
  }
  actualizarItem() {
    const itemActualizado = {
      codigo: this.nuevoItem.codigo,
      nombre: this.nuevoItem.nombre,
      descripcion: this.nuevoItem.descripcion,
      importante: this.nuevoItem.importante,
  };
  // this.areaAuxActualizar = this.areaNueva;
    this.itemEspecialesService.update(itemActualizado).subscribe(areaResponse => {
    }, (error) => {
      return throwError('Ha fallado el editar el área, revisar conexión de internet');
    }, () => {
      this.nuevoItem = new ItemEspeciales();
      this.actualizar = false;
      swal.fire(
        'Item actualizado corectamente',
        '',
        'success',
      );
    });
  }
  eliminarArea(item: ItemEspeciales) {
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
        };
        this.itemEspecialesService.publicdelete(itemEliminado).subscribe(updatedUserResponse => {
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
