import { TestBed } from '@angular/core/testing';

import { StockPricesService } from './stock-prices.service';

describe('StockPricesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockPricesService = TestBed.get(StockPricesService);
    expect(service).toBeTruthy();
  });
});
