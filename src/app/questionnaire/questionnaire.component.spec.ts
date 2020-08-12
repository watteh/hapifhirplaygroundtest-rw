import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionnaireComponent } from './questionnaire.component';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ QuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render h1 tag', () => {
    const fixture = TestBed.createComponent(QuestionnaireComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Please fill out the Questionnaire below:');
  });
});
