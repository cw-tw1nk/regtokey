import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class InviteService{
  constructor(private api: ApiService, private ps: ProjectService) {}

  info(invite_id: string) {
    return this.api.info(invite_id)
  }


  create(invite_id: string) {
    // project$.subscribe(value => {
    //   this.ps.init(value._id)
    // });
    return this.api.createProject(invite_id);
  }
}
