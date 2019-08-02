import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosBloqueadosComponent } from './formularios-bloqueados.component';

describe('FormulariosBloqueadosComponent', () => {
  let component: FormulariosBloqueadosComponent;
  let fixture: ComponentFixture<FormulariosBloqueadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariosBloqueadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosBloqueadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
