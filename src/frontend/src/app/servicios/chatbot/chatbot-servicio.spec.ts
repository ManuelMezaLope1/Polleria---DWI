import { TestBed } from '@angular/core/testing';

import { ChatbotServicio } from './chatbot-servicio';

describe('ChatbotServicio', () => {
  let service: ChatbotServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
