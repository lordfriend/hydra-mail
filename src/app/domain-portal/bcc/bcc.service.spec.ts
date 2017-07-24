import { TestBed, inject } from '@angular/core/testing';

import { BccService } from './bcc.service';

describe('BccService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BccService]
    });
  });

  it('should be created', inject([BccService], (service: BccService) => {
    expect(service).toBeTruthy();
  }));
});
