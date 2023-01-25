import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ngxDragDropFileUpload]'
})
export class DragDropFileUploadDirective {
  @Output() fileDropped = new EventEmitter<FileList>();
  @Output() over = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();
  @HostBinding('style.background-color') private background = '#ffffff';
  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.over.next();
    this.background = '#e2eefd';
  }
  // Dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.leave.next();
    this.background = '';
  }
  // Drop Event
  @HostListener('drop', ['$event']) public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
