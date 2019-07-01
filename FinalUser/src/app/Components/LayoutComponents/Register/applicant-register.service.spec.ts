import { TestBed } from '@angular/core/testing';

import { ApplicantRegisterService } from './applicant-register.service';

describe('ApplicantRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicantRegisterService = TestBed.get(ApplicantRegisterService);
    expect(service).toBeTruthy();
  });
});
