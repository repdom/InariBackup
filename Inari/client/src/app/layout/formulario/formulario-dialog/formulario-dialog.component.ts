import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { formatDate } from '@angular/common';
import swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { Area, FormularioModelo } from '../../../clases/formulario/formulario';
import { FormularioModeloService } from '../../../services/formulario/formulario-modelo.service';
import { FormularioModeloItemService } from '../../../services/formulario/formulario-modelo-item.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-formulario-dialog',
  templateUrl: './formulario-dialog.component.html',
  styleUrls: ['./formulario-dialog.component.scss']
})
export class FormularioDialogComponent implements OnInit {
  areaSeleccionada: Area = new Area();
  formularioNuevo: FormularioModelo = new FormularioModelo();
  formulariosModelos: FormularioModelo[] = [];
  formularioAgregado: FormularioModelo = new FormularioModelo();
  private userID: number;
  public agregar = false;
  // tslint:disable-next-line:no-inferrable-types
  public tamanioEsCero: boolean = true;

  constructor(
    public dialogArea: MatDialogRef<FormularioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Area,
    private formularioModeloService: FormularioModeloService,
    private formularioModeloItemService: FormularioModeloItemService,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.formularioNuevo.nombre = '';
    this.userID = Number(this.cookieService.get('userid'));
  }

  agregarFormulario() {
    this.agregar = !this.agregar;
  }

  agregarNuevoFormulario() {
    const d2 = new Date();
    const d = new Date(d2.getTime());
    const fechaCreacion = formatDate(new Date(d), 'yyyy-MM-dd', 'en-US');

    const formularioModelo = {
      codigo: 0,
      nombre: this.formularioNuevo.nombre,
      fechaCreacion: fechaCreacion,
      cancelado: 0,
      areaCodigo: this.data.codigo,
      usuarioRelacionado: this.userID,
    };

    this.formularioAgregado = {
      codigo: 0,
      nombre: this.formularioNuevo.nombre,
      fechaCreacion: fechaCreacion,
      cancelado: 0,
    };

    const nombreAux = this.formularioNuevo.nombre;
    const indice = this.formulariosModelos.push(formularioModelo);
    this.formularioNuevo.nombre = '';
    // swal.showLoading();

    this.formularioModeloService.create(formularioModelo).subscribe(formularioModeloResponse => {
      this.formulariosModelos[indice - 1].codigo = formularioModeloResponse['codigo'];
      this.formularioAgregado.codigo = formularioModeloResponse['codigo'];
    }, (error) => {
      this.formulariosModelos.pop();
      this.formularioNuevo.nombre = nombreAux;
      this.formularioAgregado = undefined;
      // swal.hideLoading();
    }, () => {
        swal.fire(
          'Formulario Agregado',
          '',
          'success'
        );
        this.formularioNuevo = new FormularioModelo();
    });
  }
  cancelar() {
    this.formularioNuevo = new FormularioModelo();
  }
}
