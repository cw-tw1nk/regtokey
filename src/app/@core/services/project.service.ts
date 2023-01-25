import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Question } from '../data/questionnaire/question';
import { ProjectAnswer, ProjectData, ProjectPage } from '../data/project';
import { BehaviorSubjectItem } from '../utils/BehaviorSubjectItem';
import { countdownTimer } from '../utils/countdownTimer';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly pageData$ = new BehaviorSubjectItem<ProjectData>(null);
  readonly question$ = new BehaviorSubjectItem<Question>(null);
  readonly flag_countdown$ = new BehaviorSubjectItem<boolean>(false);
  countdown$: Observable<string>;

  constructor(private phs: ApiService, private ls: LocalStorageService) {
    this.pageData$.value$.subscribe(value => {
      if (value) {
        console.log(value);
        if (value.page === ProjectPage.Question) {
          let data = value.data as Question;
          this.question$.value = data;
          if (data.expires) {
            this.countdown$ = countdownTimer(data.expires);
            this.flag_countdown$.value = true;
          } else {
            this.flag_countdown$.value = false;
          }
        } else {
          this.flag_countdown$.value = false;
        }
      }
    });
  }

  get status(): boolean {
    return this.ls.hasKey("project")
  }

  init() {
    this.phs.getQuestion(this.ls.getData('project')).subscribe(value => {
      this.pageData$.value = value;
    });
  }

  async back() {
    this.phs.back(this.ls.getData('project')).subscribe(value => {
      this.pageData$.value = value;
    });
  }

  skip() {
    this.phs.skip(this.ls.getData('project')).subscribe(value => {
      this.pageData$.value = value;
    });
  }

  next(answer: ProjectAnswer) {
    this.phs.next(this.ls.getData('project'), answer).subscribe(value => {
      this.pageData$.value = value;
    });
  }

  complete() {
    this.phs.getQuestion(this.ls.getData('project')).subscribe(value => {
      this.pageData$.value = value;
    });
  }
}
