import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { QuestionnaireService } from '../services/questionnaire.service';
import { ApiService } from '../../app/services/api-service.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  questionnaireForm: FormGroup;
  questionnaire:any = [];
  questionnaireResponse:any = {};
  patientData;
  questionnaireFhir;

  constructor(private questionnaireService: QuestionnaireService, private apiService: ApiService) { 
  }
  
  ngOnInit(): void {
    // Subscribe to questionnaireService api to get questionnaire from questionnaire.json in assets
    let questions = {};
    this.questionnaireService.getQuestions()
      .subscribe(res => {
        this.questionnaireFhir = res;
        // @ts-ignore
        res.item.map((q) => {
          // creates form controls for questions in html
          if (q.item) {
            this.questionnaire.push(q);
            q.item.map((group) =>{
              this.questionnaire.push(group);
              if (group.type === 'string') {
                questions[group.linkId] = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')]));
              } else {
                questions[group.linkId] = new FormControl('', Validators.required);
              }
            });
          } else {
            this.questionnaire.push(q);
            if (q.type === 'string') {
              questions[q.linkId] = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')]));
            } else {
              questions[q.linkId] = new FormControl('', Validators.required);
            }
          }
        });
        this.questionnaireForm = new FormGroup(questions);
      });
    
    // subscribe to get patients from api service and add to variable patientData
    this.apiService.getPatients().subscribe(
      data => {
        this.patientData = data;
      }
    );
  }

  onSubmit() {
    // submission for form to add question responses to questionnaireFhir variable
    for (var i in this.questionnaireForm.value) {
      this.questionnaireFhir.item.map((id) => {
        if (i === id.linkId) {
          this.questionnaireFhir.item.find(prop => prop.linkId === id.linkId).answer = this.questionnaireForm.value[i];
        }

        if (id.item) {
          id.item.map((idTwo) => {
            if (i === idTwo.linkId) {
              this.questionnaireFhir.item.find(prop => prop.linkId === id.linkId).item.find(prop => prop.linkId === idTwo.linkId)
              .answer = this.questionnaireForm.value[i];
            }
          });
        }
      });
    }

    // create questionnaireREsponse object including patientData and questionnaireFhir variables
    this.questionnaireFhir;
    this.questionnaireResponse = {
      resourceType: "QuestionnaireResponse",
      id: "1",
      text: {
        status: "generated",
        div: '',
      },
      contained: [
        this.patientData,
        {
          resourceType: "ServiceRequest",
          id: "1",
          status: "in-progress",
          subject: {
            reference: this.patientData.id
          },
          requester: {
            reference: "#RWatson"
          }
        },
        {
          resourceType: "Practitioner",
          id: "1",
          identifier: [
            {
              type: {
                text: "Mr. Ryan Watson"
              },
              system: "http://cancer.questionnaire.org/systems/id/org",
              value: "AUMC"
            }
          ]
        }
      ],
      identifier: {
        system: "http://example.org/fhir/NamingSystem/questionnaire-ids",
        value: "Q4533"
      },
      basedOn: [
        {
          reference: "#order"
        }
      ],
      partOf: [
        {
          reference: "#Questionnaire/Q221"
        }
      ],
      status: "completed",
      subject: {
        reference: this.patientData.id
      },
      encounter: {
        reference: "#encounter/questionnaire"
      },
      authored: Date(),
      author: {
        reference: "#RWatson"
      },
      item: this.questionnaireFhir
    }
  }
}
