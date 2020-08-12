import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireService } from './questionnaire.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionnaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('responses should be an array', () => {
    expect(service.getResponses()).toEqual(Array);
  });
});
