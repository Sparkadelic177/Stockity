import { TestBed } from '@angular/core/testing';

import { StockDetailsService } from './stock-details.service';

describe('StockDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockDetailsService = TestBed.get(StockDetailsService);
    expect(service).toBeTruthy();
  });
});
