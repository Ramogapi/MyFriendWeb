import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';
import { Success } from '../../../models/Response/success';
import { CodeLookUp } from '../../../models/LookUp/codelookup';
import { IdentityService } from '../../../services/identity.service';
import { CodeLookUpResponse } from '../../../models/LookUp/codelookupresponse';
import { Failure } from '../../../models/Response/failure';
import { StorageService } from '../../../services/storage.service';
import { UserUploadRequest } from '../../../models/User/UserUpload/useruploadrequest';
import { AttachmentComponent } from '../../common/attachment/attachment.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-userdocument',
  templateUrl: './userdocument.component.html',
  styleUrl: '../userStyle.css'
})
export class UserdocumentComponent implements OnInit {
  @ViewChild('AttachmentComponent') AttachmentComponent: AttachmentComponent = {} as AttachmentComponent;
  @Output("ngOnInit") reload: EventEmitter<any> = new EventEmitter();
  labelName = "Upload";
  fileName: string | undefined
  file: File = {} as File;

  frmDocument: FormGroup = {} as FormGroup;
  public model: UserUploadRequest = new UserUploadRequest();
  message: String = '';
  documentTypes: CodeLookUp[] = [];
  constructor(private identityService: IdentityService, private userService: UserService, 
    private storageService: StorageService,
    private toastService: ToastService, private formBuilder: FormBuilder) {
      this.createForm();
  }

  createForm() {
      this.frmDocument = this.formBuilder.group({
        typeCode: ['', Validators.required],
        upload: ['', Validators.required]
      });
  }

  processFiles(file?: File) {
    if(file != null){
      let upload = this.frmDocument.controls['upload']
      if(upload != null){
        upload.markAsDirty();
        upload.setErrors(null);
      }
      this.file = file;
    }
  }

  submitted = false;

  ngOnInit() {
    this.identityService.getCodeLookUps('User').subscribe((result: CodeLookUpResponse) => {
      this.documentTypes = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public submit() {
    let user = JSON.parse(this.storageService.getUser()) as Success;
    this.model.userId = user.response.value.id;

    this.model.upload = this.file;
    console.log('model: ' + JSON.stringify(this.model));
    
    this.submitted = true;

    this.userService.createUserUpload(this.model)
               .subscribe(result=>{
                this.refresh();
                let success = result as Success;
                console.log("success: " + JSON.stringify(success));
                this.toastService.success('Upload successfully saved!');
               },error=>{
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
  }

  public refresh(){
    this.AttachmentComponent.refresh();
    this.reload.emit();
    this.message = '';
    this.frmDocument.reset();
    Object.keys(this.frmDocument.controls).forEach((key: string) => {
      const control = this.frmDocument.get(key) as FormGroup;
      control.setErrors(null);
    });
  }

  get f(){
      return this.frmDocument.controls;
  }
}
