import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEvaluacionComponent } from './listar-evaluacion.component';

describe('ListarEvaluacionComponent', () => {
  let component: ListarEvaluacionComponent;
  let fixture: ComponentFixture<ListarEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
