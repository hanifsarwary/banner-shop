import { TestBed } from '@angular/core/testing';

import { ErrorInsterceptorService } from './error-insterceptor.service';

describe('ErrorInsterceptorService', () => {
  let service: ErrorInsterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorInsterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
