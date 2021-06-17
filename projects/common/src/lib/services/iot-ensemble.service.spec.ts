import { TestBed } from '@angular/core/testing';

import { IotEnsembleService } from './iot-ensemble.service';

describe('IotEnsembleService', () => {
  let service: IotEnsembleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotEnsembleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
