import { TestBed } from '@angular/core/testing';

import { FormularioModeloService } from './formulario-modelo.service';

describe('FormularioModeloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormularioModeloService = TestBed.get(FormularioModeloService);
    expect(service).toBeTruthy();
  });
});
