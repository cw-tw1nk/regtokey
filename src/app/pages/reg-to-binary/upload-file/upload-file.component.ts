import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface FileEventTarget extends HTMLInputElement{
  files: FileList
}
export interface HTMLInputEvent extends Event {
  target: FileEventTarget;
}

@Component({
  selector: 'ngx-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  @Output()
  onChange = new EventEmitter<string>();

  file: any;
  constructor() { }

  ngOnInit(): void {
  }

  async fileChanged($event: Event) {
    let files = ($event as HTMLInputEvent).target.files;
    await this.drop(files)
  }

  async drop(files: FileList) {
    if (files.length > 0) {
      const file = files.item(0)
      const text = await file.text();
      this.onChange.next(text)
    }
  }
}
