import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Questionnaire } from '../../../@core/data/questionnaire/questionnaire';
import { countdownTimer, duration } from '../../../@core/utils/countdownTimer';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  expires$: Observable<string>

  @Input()
  questionnaire: Questionnaire;

  @Output()
  onStart = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.questionnaire?.expires) {
      console.log('Start')
      this.expires$ = countdownTimer(this.questionnaire.expires)
    }
  }

  get duration() {
    return duration(this.questionnaire.limit);
  }
}
