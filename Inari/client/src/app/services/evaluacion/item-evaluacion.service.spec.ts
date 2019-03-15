import { TestBed } from '@angular/core/testing';

import { ItemEvaluacionService } from './item-evaluacion.service';

describe('ItemEvaluacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemEvaluacionService = TestBed.get(ItemEvaluacionService);
    expect(service).toBeTruthy();
  });
});
