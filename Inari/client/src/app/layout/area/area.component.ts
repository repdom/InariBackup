import { Area } from './../../clases/formulario/formulario';
import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { AreaService } from 'src/app/services/area/area.service';
import { CookieService } from 'ngx-cookie-service';
import { ColaboradorService } from '../../services/usuario/colaborador.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Colaborador, RolMapping, Rol } from 'src/app/clases/formulario/colaborador';
import { RolMappingService } from '../../services/rolMapping/rol-mapping.service';
import { throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  areaNueva: Area = new Area();
  listaColaboradores: Colaborador[] = [];
  areas: Area[] = [];
  displayedColumns = ['nombreArea', 'nombreyApellidoAdministrador', 'usuario', 'acciones'];
  dataSource: MatTableDataSource<Area>;
  actualizar = false;
  // tslint:disable-next-line:no-inferrable-types
  public imageSrc: string = '';
  areaAuxActualizar: Area = new Area();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
          private areaService: AreaService,
          private changeDetectorRefs: ChangeDetectorRef,
          private cookieService: CookieService,
          private colaboradoresService: ColaboradorService,
          private spinner: NgxSpinnerService,
          private rolMappingService: RolMappingService
      ) {
      }

  ngOnInit() {
    this.listarColaborador();
    this.listarAreas();
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
                if (colaborador.Rol.id === 3) {
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
    this.areaService.getAll().subscribe(areaResponse => {
      areaResponse.forEach(areaElement => {
        if (areaElement['cancelado'] === 0) {
          // tslint:disable-next-line:prefer-const
          let area: Area = new Area();
          area.nombre = areaElement['nombre'];
          area.cancelado = areaElement['cancelado'];
          area.codigo = areaElement['codigo'];
          area.usuarioAdministradorArea = areaElement['usuarioAdministradorArea'];
          area.foto[0] = areaElement['foto1'];
          area.foto[1] = areaElement['foto2'];
          area.foto[2] = areaElement['foto3'];
          area.foto[3] = areaElement['foto4'];
          area.foto[4] = areaElement['foto5'];
          area.foto[5] = areaElement['foto6'];
          area.foto[6] = areaElement['foto7'];
          area.foto[7] = areaElement['foto8'];
          area.foto[8] = areaElement['foto9'];
          area.foto[9] = areaElement['foto10'];
          area.administrador = this.listaColaboradores.filter(c => c.id === area.usuarioAdministradorArea)[0];
          this.areas.push(area);
          this.dataSource = new MatTableDataSource(this.areas);
          this.changeDetectorRefs.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
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
    if (this.areaNueva.nombre !== '' &&
        this.areaNueva.usuarioAdministradorArea !== 0) {
      const area = {
        codigo: 0,
        nombre: this.areaNueva.nombre,
        cancelado: this.areaNueva.cancelado,
        foto1: this.areaNueva.foto[0],
        foto2: this.areaNueva.foto[1],
        foto3: this.areaNueva.foto[2],
        foto4: this.areaNueva.foto[3],
        foto5: this.areaNueva.foto[4],
        foto6: this.areaNueva.foto[5],
        foto7: this.areaNueva.foto[6],
        foto8: this.areaNueva.foto[7],
        foto9: this.areaNueva.foto[8],
        foto10: this.areaNueva.foto[9],
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
        return throwError('Debe de introducir obligatoriamente el nombre y el encargado del área');
      }, () => {
        swal.fire(
          'Área Agregada',
          '',
          'success',
        );
      });
    } else {
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
    // this.areaAuxActualizar = this.areas.filter(a => a.codigo === area.codigo)[0];
  }
  editarArea() {
    const area = {
      codigo: this.areaNueva.codigo,
      nombre: this.areaNueva.nombre,
      cancelado: this.areaNueva.cancelado,
      foto1: this.areaNueva.foto[0],
      foto2: this.areaNueva.foto[1],
      foto3: this.areaNueva.foto[2],
      foto4: this.areaNueva.foto[3],
      foto5: this.areaNueva.foto[4],
      foto6: this.areaNueva.foto[5],
      foto7: this.areaNueva.foto[6],
      foto8: this.areaNueva.foto[7],
      foto9: this.areaNueva.foto[8],
      foto10: this.areaNueva.foto[9],
      usuarioAdministradorArea: this.areaNueva.usuarioAdministradorArea
    };
    // this.areaAuxActualizar = this.areaNueva;
    this.areaService.update(area).subscribe(areaResponse => {
    }, (error) => {
      return throwError('Ha fallado el editar el área, revisar conexión de internet');
    }, () => {
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
            'El colaborador ha sido eliminado.',
            'success'
          );
        });
      }
    });
  }
}
