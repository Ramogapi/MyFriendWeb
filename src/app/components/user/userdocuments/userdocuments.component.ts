import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserUploads } from '../../../models/User/UserUpload/useruploads';
import { Failure } from '../../../models/Response/failure';
import { UserService } from '../../../services/user.service';
import { StorageService } from '../../../services/storage.service';
import { Success } from '../../../models/Response/success';
import { Upload } from '../../../models/upload';
import { FormGroup } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { ModalService } from '../../../services/modal.service';
import { Question } from '../../../models/Modals/question';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-userdocuments',
  templateUrl: './userdocuments.component.html',
  styleUrl: '../userStyle.css'
})
export class UserdocumentsComponent implements OnInit {
  @Output("goToPreviousStep") goToPreviousStep: EventEmitter<any> = new EventEmitter();
  @Output("goToNextStep") goToNextStep: EventEmitter<any> = new EventEmitter();
  dataSource: Upload[] = [];
  displayedColumns: string[] = ['type', 'name', 'actions'];

  frmDocument: FormGroup = {} as FormGroup;
  constructor(private userService: UserService, private modalService: ModalService,
    private storageService: StorageService, private toastService: ToastService) {

  }

  submitted = false;

  ngOnInit() {
    let user = JSON.parse(this.storageService.getUser()) as Success;
    let userId = user.response.id;
    this.userService.getUserUploads(userId).subscribe((result: UserUploads) => {
      this.dataSource = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public back() {
    this.goToPreviousStep.emit();
  }

  public next() {
    this.goToNextStep.emit();
  }

  public delete(id: number, name: string) {
    const model: Question = {} as Question;
    model.title = 'Delete';
    model.content = 'Are you sure you want to delete <b>"' + name + '"</b>?';
    model.request = () => this.removeUpload(id);
    this.modalService.question(model);    
  }

  public removeUpload(id: number){
    this.userService.deleteUserUpload(id).subscribe(result=>{
      this.ngOnInit();
      let success = result as Success;
      console.log("success: " + JSON.stringify(success));
      this.toastService.success('Upload successfully deleted!');
    },error=>{
      console.log('failure: ' + JSON.stringify(error));
     });
  }

  public download(id: number) {
    this.userService.downloadUserUpload(id).subscribe( blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl;
      a.target = "_blank";
      a.click();
      URL.revokeObjectURL(objectUrl);
    },error=>{
      console.log('failure: ' + JSON.stringify(error));
     });
  }

  get f(){
      return this.frmDocument.controls;
  }
}
