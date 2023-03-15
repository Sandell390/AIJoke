import { TestBed } from '@angular/core/testing';

import { ChatgptCallService } from './chatgpt-call.service';

describe('ChatgptCallService', () => {
  let service: ChatgptCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatgptCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
