import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.css'
})
export class AttachmentComponent implements OnInit {
  @Output('processFiles') processFiles: EventEmitter<File> = new EventEmitter();
  @Input({ required: true}) labelName: string = {} as string;
  @ViewChild('fileUpload') fileUpload: ElementRef = {} as ElementRef;

  upload: FormControl = new FormControl("", Validators.required);
  @Input()
  fileName: string | undefined
  files: File[] = []

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {

  }

  public refresh(){
    this.upload.setValue('');
    this.upload.setErrors(null);
  }

  onClick(event: Event) {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onFileSelected(event: any) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (this.validate(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        this.files.push(files[i]);
        this.processFiles.emit(file);
        this.upload.patchValue(file.name);
      }
    }
  }

  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }
}
