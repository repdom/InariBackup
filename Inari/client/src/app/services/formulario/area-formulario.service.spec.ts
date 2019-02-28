import { TestBed } from '@angular/core/testing';

import { AreaFormularioService } from './area-formulario.service';

describe('AreaFormularioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaFormularioService = TestBed.get(AreaFormularioService);
    expect(service).toBeTruthy();
  });
});
