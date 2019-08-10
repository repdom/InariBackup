import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaMensajeriaComponent } from './cola-mensajeria.component';

describe('ColaMensajeriaComponent', () => {
  let component: ColaMensajeriaComponent;
  let fixture: ComponentFixture<ColaMensajeriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaMensajeriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaMensajeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
