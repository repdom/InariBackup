import { TestBed } from '@angular/core/testing';

import { ColaMensajeriaService } from './cola-mensajeria.service';

describe('ColaMensajeriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColaMensajeriaService = TestBed.get(ColaMensajeriaService);
    expect(service).toBeTruthy();
  });
});
