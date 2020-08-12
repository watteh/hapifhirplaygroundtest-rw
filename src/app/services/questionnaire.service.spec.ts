import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionnaireService } from './questionnaire.service';

describe('QuestionnaireService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [QuestionnaireService]
    });
  });

  it('should be created', () => {
    const service: QuestionnaireService = TestBed.get(QuestionnaireService);
    expect(service).toBeTruthy();
  });

  it('should have getQuestions function', () => {
    const service: QuestionnaireService = TestBed.get(QuestionnaireService);
    expect(service.getQuestions).toBeTruthy();
   });
});
