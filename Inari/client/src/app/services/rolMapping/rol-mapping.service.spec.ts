import { TestBed } from '@angular/core/testing';

import { RolMappingService } from './rol-mapping.service';

describe('RolMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolMappingService = TestBed.get(RolMappingService);
    expect(service).toBeTruthy();
  });
});
