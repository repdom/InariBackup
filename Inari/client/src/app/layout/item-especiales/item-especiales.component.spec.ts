import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEspecialesComponent } from './item-especiales.component';

describe('ItemEspecialesComponent', () => {
  let component: ItemEspecialesComponent;
  let fixture: ComponentFixture<ItemEspecialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEspecialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
