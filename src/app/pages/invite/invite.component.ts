import { Component, OnInit } from '@angular/core';
import { InviteService } from '../../@core/services/invite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../@core/data/project';
import { Questionnaire } from '../../@core/data/questionnaire/questionnaire';
import { LocalStorageService } from '../../@core/utils/local-storage.service';

@Component({
  selector: 'ngx-invite',
  template: '<ngx-questionnaire [questionnaire]="questionnaire$|async" (onStart)="createProject()"></ngx-questionnaire>',
})
export class InviteComponent implements OnInit {
  questionnaire$: Observable<Questionnaire>
  invite_id: string;

  constructor(private route: ActivatedRoute, private router: Router, private is: InviteService, private ls: LocalStorageService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      if (params.has("invite_id")) {
        this.questionnaire$ = this.is.info(params.get('invite_id'))
        this.invite_id = params.get('invite_id')
      } else {
        await this.router.navigate(['/403'])
      }
    })
  }

  createProject() {
    this.is.create(this.invite_id).subscribe(value => {
      this.ls.saveData('project', value._id);
      this.router.navigate(['/project'], {
        replaceUrl: true
      })
    })
  }
}
