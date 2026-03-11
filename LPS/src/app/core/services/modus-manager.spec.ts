import { TestBed } from '@angular/core/testing';

import { ModusManager } from './modus-manager';

describe('ModusManager', () => {
  let service: ModusManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModusManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
