import { TestBed, inject } from '@angular/core/testing';

import { DkimService } from './dkim.service';

describe('DkimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DkimService]
    });
  });

  it('should be created', inject([DkimService], (service: DkimService) => {
    expect(service).toBeTruthy();
  }));
});
