import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GrupoItem } from '../item/item.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import swal from 'sweetalert2';

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
  displayedColumns = ['nombre', 'descripcion', 'acciones'];
  public seleccionado = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private spinner: NgxSpinnerService,
              private grupoService: GruposService,
              private cookieService: CookieService) { }

  ngOnInit() {
    
    this.listarItems();
    // this.listarGrupos();
  }

  listarItems() {
    this.spinner.show();
    this.grupoService.getAll().subscribe(itemResponse => {
      itemResponse.forEach(elementResponse => {
          const item: GrupoItem = {
            codigo: elementResponse['codigo'],
            descripcion: elementResponse['descripcion'],
            nombre: elementResponse['nombre'],
          };
          this.items.push(item);
          this.dataSource = new MatTableDataSource(this.items);
          this.changeDetectorRefs.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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

  /*listarGrupos() {
    this.grupoService.getAll().subscribe(r => {
      this.grupos = r;
    });
  }*/

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
      const d2 = new Date();
      const d = new Date(d2.getTime());
      const fechaCreacion = formatDate(new Date(d), 'yyyy-MM-dd', 'en-US');

      const itemAgregado = {
        nombre: this.nuevoItem.nombre,
        descripcion: this.nuevoItem.descripcion,
      };

      const auxItem = this.nuevoItem;
      this.nuevoItem = new GrupoItem();

      const index = this.items.push(auxItem);

      this.grupoService.create(itemAgregado).subscribe(itemResponse => {
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
        this.nuevoItem = new GrupoItem();
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
    this.nuevoItem = new GrupoItem();
  }
  editarItem(item: GrupoItem) {
    this.actualizar = true;
    this.nuevoItem = item;
  }
  actualizarItem() {
    const itemActualizado = {
      codigo: this.nuevoItem.codigo,
      nombre: this.nuevoItem.nombre,
      descripcion: this.nuevoItem.descripcion,
    };
  // this.areaAuxActualizar = this.areaNueva;
    this.grupoService.update(itemActualizado).subscribe(areaResponse => {
    }, (error) => {
      return throwError('Ha fallado el editar el área, revisar conexión de internet');
    }, () => {
      this.nuevoItem = new GrupoItem();
      this.actualizar = false;
      swal.fire(
        'Item actualizado corectamente',
        '',
        'success',
      );
    });
  }
  eliminarArea(item: GrupoItem) {
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
        this.grupoService.publicdelete(itemEliminado).subscribe(updatedUserResponse => {
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
