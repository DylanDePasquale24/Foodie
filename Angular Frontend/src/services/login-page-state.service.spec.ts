import { TestBed } from '@angular/core/testing';

import { LoginPageStateService } from '../app/login-page-state.service';

describe('LoginPageStateService', () => {
  let service: LoginPageStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPageStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
