import { Area } from './../../clases/formulario/formulario';
import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { AreaService } from 'src/app/services/area/area.service';
import { CookieService } from 'ngx-cookie-service';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Colaborador, RolMapping, Rol, FormularioArea } from 'src/app/clases/formulario/colaborador';
import { RolMappingService } from '../../services/rolMapping/rol-mapping.service';
import { throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { FormularioModeloService } from '../../services/formulario/formulario-modelo.service';
import { FormularioModelo } from '../../clases/formulario/formulario';
import { AreaFormularioService } from 'src/app/services/formulario/area-formulario.service';


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  areaNueva: Area = new Area();
  listaColaboradores: Colaborador[] = [];
  areas: Area[] = [];
  displayedColumns = ['nombreArea', 'acciones'];
  dataSource: MatTableDataSource<Area>;
  actualizar = false;
  // tslint:disable-next-line:no-inferrable-types
  public imageSrc: string = '';
  areaAuxActualizar: Area = new Area();
  agregarRelacionFormulario = false;
  formularios: FormularioModelo[] = [];
  formularioArea: FormularioArea[] = [];
  nuevoFormularioArea: FormularioArea = new FormularioArea();
  formularioAreasSeleccionados: FormularioModelo[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
          private areaService: AreaService,
          private changeDetectorRefs: ChangeDetectorRef,
          private cookieService: CookieService,
          private colaboradoresService: ColaboradorService,
          private spinner: NgxSpinnerService,
          private rolMappingService: RolMappingService,
          private formularioService: FormularioModeloService,
          private formularioAreaService: AreaFormularioService,
      ) {
      }

  ngOnInit() {
    this.listarColaborador();
    this.listarAreas();
    this.listarFormularios();
    this.listarFormularioArea();
  }

  listarFormularios() {
    this.formularioService.getAll().subscribe(responseFormulario => {
      responseFormulario.forEach(elementFormulario => {
        if (elementFormulario['cancelado'] === 0) {
          const formulario: FormularioModelo = {
            codigo: elementFormulario['codigo'],
            nombre: elementFormulario['nombre'],
            fechaCreacion: elementFormulario['fechaCreacion'],
            cancelado: elementFormulario['cancelado'],
          };
          this.formularios.push(formulario);
        }
      });
    }, (error) => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Hubo un error en la carga de datos. Revise conexión a internet.',
      });
    }, () => {
    });
  }

  listarFormularioArea() {
    this.formularioAreaService.getAll().subscribe(responseFormulario => {
      responseFormulario.forEach(elementFormulario => {
        if (elementFormulario['cancelado'] === 0) {
          const formularioArea: FormularioArea = {
            cancelado: elementFormulario['cancelado'],
            id: elementFormulario['id'],
            area: elementFormulario['area'],
            formularioModelo: elementFormulario['formularioModelo']
          };
          this.formularioArea.push(formularioArea);
        }
      });
    }, (error) => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Hubo un error en la carga de datos. Revise conexión a internet.',
      });
    }, () => {
    });
  }

  // listar colaboradores dentro del sistema
  listarColaborador() {
    this.spinner.show();
    this.colaboradoresService.getAll().subscribe(colaboradoresResponse => {
      colaboradoresResponse.forEach(elementColaboradores => {
        // if (elementColaboradores['cancelado'] === 0) {
          const colaborador: Colaborador = {
            primerNombre: elementColaboradores['primerNombre'],
            segundoNombre: elementColaboradores['segundoNombre'],
            primerApellido: elementColaboradores['primerApellido'],
            segundoApellido: elementColaboradores['segundoApellido'],
            username: elementColaboradores['username'],
            cedula: elementColaboradores['cedula'],
            id: elementColaboradores['id'],
            password: ''
          };
          let roleMapping = new RolMapping();
          this.rolMappingService.getAllWhereCodigoRol(colaborador.id, 'rol').subscribe(rolMappingResponse => {
            rolMappingResponse.forEach(elementRoleMapping => {
              roleMapping = {
                id: elementRoleMapping['id'],
                principalType: elementRoleMapping['principalType'],
                principalId: elementRoleMapping['principalId'],
                roleId: elementRoleMapping['roleId'],
              };
              colaborador.RoleMapping = roleMapping;
            });
            }, (error) => {
              return throwError(error);
            }, () => {
              this.rolMappingService.getRelation(roleMapping.id, 'role').subscribe(roleResponse => {
                const role: Rol = {
                  id: roleResponse['id'],
                  name: roleResponse['name'],
                  description: roleResponse['description'],
                  created: roleResponse['created'],
                  modified: roleResponse['modified'],
                };
                colaborador.Rol = role;
              }, (error) => {
                return throwError(error);
              }, () => {
                if (colaborador.Rol.name === 'Administrador de Area') {
                  this.listaColaboradores.push(colaborador);
                }
              });
            });
          // }
        });
    }, (error) => {
      return throwError(error);
    }, () => {
      this.spinner.hide();
    });
  }
  // listar areas a evaluar
  listarAreas() {
    this.spinner.show();
    this.areaService.getFilterByAttributeOrderByName().subscribe(areaResponse => {
      areaResponse.forEach(areaElement => {
        // if (areaElement['cancelado'] === 0) {
          // tslint:disable-next-line:prefer-const
          let area: Area = new Area();
          area.nombre = areaElement['nombre'];
          // area.cancelado = areaElement['cancelado'];
          area.codigo = areaElement['codigo'];
          // area.usuarioAdministradorArea = areaElement['usuarioAdministradorArea'];
          // tslint:disable-next-line:max-line-length
          // area.foto[0] = (areaElement['foto1'] !== '' || areaElement['foto1'] !== null) ? areaElement['foto1'] : 'https://i.imgur.com/5qqFPl4.png';
          // tslint:disable-next-line:max-line-length
          // area.foto[1] = (String(areaElement['foto2']).length > 0 || areaElement['foto2'] !== null) ? areaElement['foto2'] : 'https://i.imgur.com/5qqFPl4.png';
          // tslint:disable-next-line:max-line-length
          // area.foto[2] = areaElement['foto3'] !== '' && areaElement['foto3'] !== null ? areaElement['foto3'] : 'https://i.imgur.com/5qqFPl4.png';
          // tslint:disable-next-line:max-line-length
          // area.foto[3] = areaElement['foto4'] !== '' && areaElement['foto4'] !== null ? areaElement['foto4'] : 'https://i.imgur.com/5qqFPl4.png';
          // tslint:disable-next-line:max-line-length
          // area.foto[4] = areaElement['foto5'] !== '' && areaElement['foto5'] !== null ? areaElement['foto5'] : 'https://i.imgur.com/5qqFPl4.png';
          // tslint:disable-next-line:max-line-length
          // area.foto[5] = areaElement['foto6'] !== '' && areaElement['foto6'] !== null ? areaElement['foto6'] : 'https://i.imgur.com/5qqFPl4.png';
          // tslint:disable-next-line:max-line-length
          // area.foto[6] = areaElement['foto7'] !== '' && areaElement['foto7'] !== null ? areaElement['foto7'] : 'https://i.imgur.com/5qqFPl4.png';
          // tslint:disable-next-line:max-line-length
          // area.foto[7] = areaElement['foto8'] !== '' && areaElement['foto8'] !== null ? areaElement['foto8'] : 'https://i.imgur.com/5qqFPl4.png';
          // tslint:disable-next-line:max-line-length
          // area.foto[8] = (areaElement['foto9'] !== '' && areaElement['foto9'] !== null) ? areaElement['foto9'] : 'https://i.imgur.com/5qqFPl4.png';
          // tslint:disable-next-line:max-line-length
          // area.foto[9] = (areaElement['foto10'] !== '' && areaElement['foto10'] !== null) ? areaElement['foto10'] : 'https://i.imgur.com/5qqFPl4.png';
          // area.administrador = this.listaColaboradores.filter(c => c.id === area.usuarioAdministradorArea)[0];
          // console.log(area);
          this.areas.push(area);
          this.dataSource = new MatTableDataSource(this.areas);
          this.changeDetectorRefs.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        // }
      });
    }, (error) => {
      this.spinner.hide();
      return throwError('Ha ocurrido un problema, revise conexión a internet');
    }, () => {
      this.dataSource = new MatTableDataSource(this.areas);
      this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    });
  }
  // filtro enfocado en la a la tabla
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  handleInputChange(e, area: Area, i: number) {
    // tslint:disable-next-line:prefer-const
    // let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    // tslint:disable-next-line:prefer-const
    let file = e.target.files[0];
    this.spinner.show();
    // tslint:disable-next-line:prefer-const
    let pattern = /image-*/;
    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Debe de elegir una imagen',
      });
      return;
    }
    // setTimeout(() => {
      /** spinner ends after 5 seconds */
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
      area.foto[i] = this.imageSrc;
      this.spinner.hide();
    // }, 5000);
  }
  _handleReaderLoaded(e) {
    // tslint:disable-next-line:prefer-const
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
  }
  changeListener($event, area: Area, i: number): void {
    this.readThis($event.target, area, i);
  }
  readThis(inputValue: any, area: Area, i: number): void {
    // tslint:disable-next-line:prefer-const
    let file: File = inputValue.files[0];
    // tslint:disable-next-line:prefer-const
    let myReader: FileReader = new FileReader();

    // tslint:disable-next-line:prefer-const
    let pattern = /image-*/;
    if (!file.type.match(pattern)) {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Debe de elegir una imagen',
      });
      return;
    }
    myReader.onloadend = (e) => {
      area.foto[i] =  String(myReader.result);
    };
    myReader.readAsDataURL(file);
  }
  cancelar() {
    this.areaNueva = new Area();
    // if (this.actualizar === true) {
      // this.areas.filter(a => a.codigo === this.areaAuxActualizar.codigo)[0] = this.areaAuxActualizar;
      this.actualizar = false;
    // }
  }
  agregarArea() {
    this.spinner.show();
    if (this.areaNueva.nombre !== '' &&
        this.areaNueva.usuarioAdministradorArea !== 0) {
      const area = {
        codigo: 0,
        nombre: this.areaNueva.nombre,
        cancelado: this.areaNueva.cancelado,
        foto1: this.areaNueva.foto[0] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[0] : '',
        foto2: this.areaNueva.foto[1] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[1] : '',
        foto3: this.areaNueva.foto[2] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[2] : '',
        foto4: this.areaNueva.foto[3] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[3] : '',
        foto5: this.areaNueva.foto[4] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[4] : '',
        foto6: this.areaNueva.foto[5] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[5] : '',
        foto7: this.areaNueva.foto[6] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[6] : '',
        foto8: this.areaNueva.foto[7] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[7] : '',
        foto9: this.areaNueva.foto[8] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[8] : '',
        foto10: this.areaNueva.foto[9] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[9] : '',
        usuarioAdministradorArea: this.areaNueva.usuarioAdministradorArea
      };
      this.areaNueva.administrador = this.listaColaboradores.filter(c => c.id === area.usuarioAdministradorArea)[0];
      const auxArea = this.areaNueva;
      const indice: number = this.areas.push(this.areaNueva);
      this.dataSource.data = this.areas;
      this.areaNueva = new Area();
      this.areaService.create(area).subscribe(areaRespuesta => {
        this.areas[indice - 1].codigo = areaRespuesta['codigo'];
      }, (error) => {
        this.areaNueva = auxArea;
        this.areas.pop();
        this.dataSource.data = [];
        this.dataSource.data = this.areas;
        this.spinner.hide();
        return throwError('Debe de introducir obligatoriamente el nombre y el encargado del área');
      }, () => {
        this.spinner.hide();
        swal.fire(
          'Área Agregada',
          '',
          'success',
        );
      });
    } else {
      this.spinner.hide();
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Debe de llenar obligatoriamente los campos: nombre de área y seleccionar un administrador de área',
      });
    }
  }
  actualizarArea(area: Area) {
    this.areaNueva = area;
    this.actualizar = true;
    this.spinner.show();
    // this.areaAuxActualizar = this.areas.filter(a => a.codigo === area.codigo)[0];
    this.areaService.getFromCode(area.codigo).subscribe(areaElement => {
      // let area: Area = new Area();
      this.areaNueva.nombre = areaElement['nombre'];
      // area.cancelado = areaElement['cancelado'];
      this.areaNueva.codigo = areaElement['codigo'];
      this.areaNueva.usuarioAdministradorArea = areaElement['usuarioAdministradorArea'];
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[0] = (areaElement['foto1'] !== '' || areaElement['foto1'] !== null) ? areaElement['foto1'] : 'https://i.imgur.com/5qqFPl4.png';
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[1] = (String(areaElement['foto2']).length > 0 || areaElement['foto2'] !== null) ? areaElement['foto2'] : 'https://i.imgur.com/5qqFPl4.png';
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[2] = areaElement['foto3'] !== '' && areaElement['foto3'] !== null ? areaElement['foto3'] : 'https://i.imgur.com/5qqFPl4.png';
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[3] = areaElement['foto4'] !== '' && areaElement['foto4'] !== null ? areaElement['foto4'] : 'https://i.imgur.com/5qqFPl4.png';
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[4] = areaElement['foto5'] !== '' && areaElement['foto5'] !== null ? areaElement['foto5'] : 'https://i.imgur.com/5qqFPl4.png';
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[5] = areaElement['foto6'] !== '' && areaElement['foto6'] !== null ? areaElement['foto6'] : 'https://i.imgur.com/5qqFPl4.png';
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[6] = areaElement['foto7'] !== '' && areaElement['foto7'] !== null ? areaElement['foto7'] : 'https://i.imgur.com/5qqFPl4.png';
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[7] = areaElement['foto8'] !== '' && areaElement['foto8'] !== null ? areaElement['foto8'] : 'https://i.imgur.com/5qqFPl4.png';
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[8] = (areaElement['foto9'] !== '' && areaElement['foto9'] !== null) ? areaElement['foto9'] : 'https://i.imgur.com/5qqFPl4.png';
      // tslint:disable-next-line:max-line-length
      this.areaNueva.foto[9] = (areaElement['foto10'] !== '' && areaElement['foto10'] !== null) ? areaElement['foto10'] : 'https://i.imgur.com/5qqFPl4.png';
      this.areaNueva.administrador = this.listaColaboradores.filter(c => c.id === areaElement['usuarioAdministradorArea'])[0];
      console.log(this.areaNueva);

    }, (error) => {
      this.spinner.hide();
    },
    () => {
      this.spinner.hide();
    });
  }
  editarArea() {
    // this.areaService.getFromCode()
    this.spinner.show();
    const area = {
      codigo: this.areaNueva.codigo,
      nombre: this.areaNueva.nombre,
      cancelado: this.areaNueva.cancelado,
      foto1: this.areaNueva.foto[0] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[0] : '',
      foto2: this.areaNueva.foto[1] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[1] : '',
      foto3: this.areaNueva.foto[2] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[2] : '',
      foto4: this.areaNueva.foto[3] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[3] : '',
      foto5: this.areaNueva.foto[4] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[4] : '',
      foto6: this.areaNueva.foto[5] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[5] : '',
      foto7: this.areaNueva.foto[6] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[6] : '',
      foto8: this.areaNueva.foto[7] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[7] : '',
      foto9: this.areaNueva.foto[8] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[8] : '',
      foto10: this.areaNueva.foto[9] !== 'https://i.imgur.com/5qqFPl4.png' ? this.areaNueva.foto[9] : '',
      usuarioAdministradorArea: this.areaNueva.usuarioAdministradorArea
    };
    // this.areaAuxActualizar = this.areaNueva;
    this.areaService.update(area).subscribe(areaResponse => {
    }, (error) => {
      this.spinner.hide();
      return throwError('Ha fallado el editar el área, revisar conexión de internet');
    }, () => {
      this.spinner.hide();
      this.areaNueva = new Area();
      swal.fire(
        'Área actualizada corectamente',
        '',
        'success',
      );
    });
  }
  eliminarArea(area: Area) {
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
        const areaActualizada = {
          codigo: area.codigo,
          cancelado: 1
        };
        this.areaService.update(areaActualizada).subscribe(updatedUserResponse => {
        }, (error) => {
          return throwError('Ha fallado el eliminar el area, revisar conexión de internet');
        }, () => {
          this.areas.splice(this.areas.findIndex(c => c.codigo === area.codigo), 1);
          this.dataSource.data = [];
          this.dataSource.data = this.areas;
          swal.fire(
            '!Eliminado con exito¡',
            'El área ha sido eliminado.',
            'success'
          );
        });
      }
    });
  }
  cargarFormulariosActivos(area: Area) {
    this.spinner.show();
    this.formularioAreasSeleccionados = [];
    this.agregarRelacionFormulario = true;
    this.nuevoFormularioArea.area = area.codigo;
    const formularioAreaAux = this.formularioArea.filter(aF => aF.area === area.codigo && aF.cancelado === 0);
    let i = 0;
    if (formularioAreaAux.length > 0) {
      formularioAreaAux.forEach(formularioArea => {
        this.formularioAreasSeleccionados.push(this.formularios.find(fA => fA.codigo === formularioArea.formularioModelo));
        if (i === formularioAreaAux.length - 1) {
          this.spinner.hide();
        }
        i += 1;
      });
    } else {
      this.spinner.hide();
    }
  }
  agregarFormulario() {
    if (this.nuevoFormularioArea.formularioModelo > 0) {
      if (this.formularioAreasSeleccionados.some(formulario => formulario.codigo === this.nuevoFormularioArea.formularioModelo) === false) {
        const formulario = {
          cancelado: 0,
          area: this.nuevoFormularioArea.area,
          formularioModelo: this.nuevoFormularioArea.formularioModelo
        };
        const formularioAreaAux = this.nuevoFormularioArea;
        this.nuevoFormularioArea = new FormularioArea();
        // tslint:disable-next-line:max-line-length
        const indiceAreaFormulario = this.formularioArea.push({
          id: 0,
          cancelado: 0,
          area: formularioAreaAux.area,
          formularioModelo: formularioAreaAux.formularioModelo
        });
        const index = this.formularioAreasSeleccionados.push(this.formularios.find(f => f.codigo === formularioAreaAux.formularioModelo));
        this.formularioAreaService.create(formulario).subscribe(formularioResponse => {
          this.formularioArea[indiceAreaFormulario - 1].id = formularioResponse['id'];
        }, (error) => {
          this.formularioArea.pop();
          this.formularioAreasSeleccionados.pop();
          this.nuevoFormularioArea = formularioAreaAux;
          swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'NO se ha agregado la relación, revice conexión a internet',
          });
        }, () => {
          swal.fire(
            'Relación Agregada',
            '',
            'success',
          );
        });
      } else {
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'NO se ha agregado la relación. El formulario ya es parte de esta área',
        });
      }
    } else {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'NO se ha agregado la relación, debe de seleccionar un formulario',
      });
    }
  }

  eliminarFormulario(formularioModelo: FormularioModelo) {
    const formularioArea = this.formularioArea.find(r => r.formularioModelo === formularioModelo.codigo);
    const formularioAreaActualizar = {
      id: formularioArea.id,
      cancelado: 1,
    };
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
        this.formularioAreaService.updateWithID(formularioAreaActualizar).subscribe(responseFormulario => {
        }, (error) => {
          return throwError('Ha fallado el eliminar la relación con el formulario, revisar conexión de internet');
        }, () => {
          // tslint:disable-next-line:max-line-length
          this.formularioAreasSeleccionados.splice(this.formularioAreasSeleccionados.findIndex(r => r.codigo === formularioModelo.codigo), 1);
          swal.fire(
            '!Eliminado con exito¡',
            'La relación ha sido eliminada.',
            'success'
          );
        });
      }
    });
  }

  cancelarAgregarFormulario() {
    this.nuevoFormularioArea = new FormularioArea();
    this.agregarRelacionFormulario = false;
  }
}
