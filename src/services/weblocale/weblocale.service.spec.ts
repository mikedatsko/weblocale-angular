import { TestBed, inject } from '@angular/core/testing';

import { WeblocaleService } from './weblocale.service';

describe('LocaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeblocaleService]
    });
  });

  it('should ...', inject([WeblocaleService], (service: WeblocaleService) => {
    expect(service).toBeTruthy();
  }));
});
