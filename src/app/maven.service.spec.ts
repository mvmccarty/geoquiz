import { TestBed } from '@angular/core/testing';

import { MavenService } from './maven.service';

describe('MavenService', () => {
  let service: MavenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MavenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
