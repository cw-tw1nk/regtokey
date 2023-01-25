import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ForbiddenComponent } from './miscellaneous/forbidden/forbidden.component';
import { InviteComponent } from './invite/invite.component';
import { ProjectGuardGuard } from '../@core/guards/project-guard.guard';
import { RegToBinaryComponent } from './reg-to-binary/reg-to-binary.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      component: RegToBinaryComponent
    },
    {
      path: '403',
      component: ForbiddenComponent
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PagesRoutingModule {
}
