import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormularioModeloService } from '../../../services/formulario/formulario-modelo.service';
import { FormularioModeloItemService } from '../../../services/formulario/formulario-modelo-item.service';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FormularioModulo } from 'src/app/clases/formulario/formulario';
import { Area } from '../../clases/formulario/formulario';
import { AreaService } from '../../../services/area/area.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  displayedColumns = ['Nombre', 'Acciones'];
  txtNombreArea: string;

  dataLoteria: MatTableDataSource<FormularioModulo>;
  Areas: Area[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formularioModeloService: FormularioModeloService,
              private formularioModeloItemService: FormularioModeloItemService,
              private areaService: AreaService,
              public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.listarAreas();
  }

  listarAreas() {
    this.areaService.getAll().subscribe(areasResponse => {
      areasResponse.forEach(areaElement => {
        const area: Area = {
          codigo: areaElement['codigo'],
          nombre: areaElement['nombre'],
          cancelado: areaElement['cancelado']
        };
        this.Areas.push(area);
      });
    });
  }

  agregarArea() {

    const areaAgregada = {
      codigo: 0,
      nombre: this.txtNombreArea,
      cancelado: 0,
    };

    const ultimoElemento: number = this.Areas.push({
      codigo: 0,
      nombre: this.txtNombreArea,
      cancelado: 0,
    });

    this.areaService.create(areaAgregada).subscribe(areaResponse => {
      this.Areas[ultimoElemento - 1].codigo = areaResponse['codigo'];
      this.Areas[ultimoElemento - 1].cancelado = areaResponse['cancelado'];
      this.txtNombreArea = '';
    });
  }
}
