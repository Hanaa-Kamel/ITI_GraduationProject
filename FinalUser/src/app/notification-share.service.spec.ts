import { TestBed } from '@angular/core/testing';

import { NotificationShareService } from './notification-share.service';

describe('NotificationShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationShareService = TestBed.get(NotificationShareService);
    expect(service).toBeTruthy();
  });
});
