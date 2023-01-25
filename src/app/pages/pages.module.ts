import { NgModule } from '@angular/core';
import {
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule, NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbSpinnerModule
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { InviteComponent } from './invite/invite.component';
import { QuestionnaireComponent } from './invite/questionnaire/questionnaire.component';
import { MarkdownModule } from 'ngx-markdown';
import { RegToBinaryComponent } from './reg-to-binary/reg-to-binary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from './reg-to-binary/upload-file/upload-file.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NbSpinnerModule,
    NbCardModule,
    NbButtonModule,
    MarkdownModule,
    FormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    ReactiveFormsModule,
    NbBadgeModule,
    NbAlertModule
  ],
  declarations: [
    PagesComponent,
    InviteComponent,
    QuestionnaireComponent,
    RegToBinaryComponent,
    UploadFileComponent,
  ]
})
export class PagesModule {
}
