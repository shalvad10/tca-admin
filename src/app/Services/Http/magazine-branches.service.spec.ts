import { TestBed } from '@angular/core/testing';

import { MagazineBranchesService } from './magazine-branches.service';

describe('MagazineBranchesService', () => {
  let service: MagazineBranchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagazineBranchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
