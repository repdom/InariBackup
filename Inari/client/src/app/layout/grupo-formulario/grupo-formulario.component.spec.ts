import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoFormularioComponent } from './grupo-formulario.component';

describe('GrupoFormularioComponent', () => {
  let component: GrupoFormularioComponent;
  let fixture: ComponentFixture<GrupoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
