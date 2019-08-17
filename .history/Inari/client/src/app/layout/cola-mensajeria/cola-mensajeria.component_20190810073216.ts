import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColaMensajeriaService } from 'src/app/services/cola-mensajeria/cola-mensajeria.service';
import { throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import swal from 'sweetalert2';

export class ColaMensajeria {
  codigo: number;
  nombreDelPublicador: string;
  email: string;
}

@Component({
  selector: 'app-cola-mensajeria',
  templateUrl: './cola-mensajeria.component.html',
  styleUrls: ['./cola-mensajeria.component.scss']
})
export class ColaMensajeriaComponent implements OnInit {
  public items: ColaMensajeria[] = [];
  public nuevoItem: ColaMensajeria = new ColaMensajeria();
  dataSource: MatTableDataSource<ColaMensajeria>;
  actualizar = false;
  displayedColumns = ['nombre', 'definicion', 'acciones'];
  public seleccionado = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
              private changeDetectorRefs: ChangeDetectorRef,
              private spinner: NgxSpinnerService,
              private colaMensajeriaService: ColaMensajeriaService) { }

  ngOnInit() {
    this.listarItems();
  }

  listarItems() {
    this.spinner.show();
    this.colaMensajeriaService.getAll().subscribe(itemResponse => {
      itemResponse.forEach(elementResponse => {
        if (elementResponse['cancelado'] === 0) {
          const item: ColaMensajeria = {
            codigo: elementResponse['codigo'],
            nombreDelPublicador: elementResponse['nombreDelPublicador'],
            email: elementResponse['email'],
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  guardarItem() {
    if (this.nuevoItem.nombreDelPublicador.length > 0 &&
        this.nuevoItem.email.length > 0) {
      const d2 = new Date();
      const d = new Date(d2.getTime());
      const fechaCreacion = formatDate(new Date(d), 'yyyy-MM-dd', 'en-US');

      const itemAgregado = {
        nombreDelPublicador: this.nuevoItem.nombreDelPublicador,
        email: this.nuevoItem.email,
      };

      const auxItem = this.nuevoItem;
      this.nuevoItem = new ColaMensajeria();

      const index = this.items.push(auxItem);

      this.colaMensajeriaService.create(itemAgregado).subscribe(itemResponse => {
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
        this.nuevoItem = new ColaMensajeria();
        swal.fire(
          'Cola Mensajería Agregada',
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
    this.nuevoItem = new ColaMensajeria();
  }
  editarItem(item: ColaMensajeria) {
    this.actualizar = true;
    this.nuevoItem = item;
  }
  actualizarItem() {
    const itemActualizado = {
      codigo: this.nuevoItem.codigo,
      nombreDelPublicador: this.nuevoItem.nombreDelPublicador,
      email: this.nuevoItem.email,
    };
  // this.areaAuxActualizar = this.areaNueva;
    this.colaMensajeriaService.update(itemActualizado).subscribe(areaResponse => {
    }, (error) => {
      return throwError('Ha fallado el editar el área, revisar conexión de internet');
    }, () => {
      this.nuevoItem = new ColaMensajeria();
      this.actualizar = false;
      swal.fire(
        'EMail actualizado corectamente',
        '',
        'success',
      );
    });
  }
  eliminarArea(item: ColaMensajeria) {
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
        this.colaMensajeriaService.update(itemEliminado).subscribe(updatedUserResponse => {
        }, (error) => {
          return throwError('Ha fallado el eliminar el area, revisar conexión de internet');
        }, () => {
          this.items.splice(this.items.findIndex(i => i.codigo === item.codigo), 1);
          this.dataSource.data = [];
          this.dataSource.data = this.items;
          swal.fire(
            '!Eliminado con exito¡',
            'El email ha sido eliminado.',
            'success'
          );
        });
      }
    });
  }
}
