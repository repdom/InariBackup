import { TestBed } from '@angular/core/testing';

import { FormularioModeloItemService } from './formulario-modelo-item.service';

describe('FormularioModeloItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormularioModeloItemService = TestBed.get(FormularioModeloItemService);
    expect(service).toBeTruthy();
  });
});
