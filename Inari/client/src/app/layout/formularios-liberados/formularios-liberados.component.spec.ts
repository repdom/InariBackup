import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosLiberadosComponent } from './formularios-liberados.component';

describe('FormulariosLiberadosComponent', () => {
  let component: FormulariosLiberadosComponent;
  let fixture: ComponentFixture<FormulariosLiberadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariosLiberadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosLiberadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
