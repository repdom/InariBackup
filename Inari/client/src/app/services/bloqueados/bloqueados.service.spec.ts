import { TestBed } from '@angular/core/testing';

import { BloqueadosService } from './bloqueados.service';

describe('BloqueadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloqueadosService = TestBed.get(BloqueadosService);
    expect(service).toBeTruthy();
  });
});
