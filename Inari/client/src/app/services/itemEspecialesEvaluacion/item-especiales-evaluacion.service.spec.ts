import { TestBed } from '@angular/core/testing';

import { ItemEspecialesEvaluacionService } from './item-especiales-evaluacion.service';

describe('ItemEspecialesEvaluacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemEspecialesEvaluacionService = TestBed.get(ItemEspecialesEvaluacionService);
    expect(service).toBeTruthy();
  });
});
