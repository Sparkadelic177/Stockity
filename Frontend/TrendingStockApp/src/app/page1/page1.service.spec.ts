import { TestBed } from '@angular/core/testing';

import { Page1Service } from './page1.service';

describe('Page1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Page1Service = TestBed.get(Page1Service);
    expect(service).toBeTruthy();
  });
});
