import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private http: HttpClient) { }

  // get questions object from questionnaire.json
  getQuestions() {
    return this.http.get('../assets/questionnaire.json');
  }
}
