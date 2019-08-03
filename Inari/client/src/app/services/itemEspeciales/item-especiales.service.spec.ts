import { TestBed } from '@angular/core/testing';

import { ItemEspecialesService } from './item-especiales.service';

describe('ItemEspecialesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemEspecialesService = TestBed.get(ItemEspecialesService);
    expect(service).toBeTruthy();
  });
});
