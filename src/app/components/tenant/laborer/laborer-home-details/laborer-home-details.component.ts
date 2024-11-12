import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../../../models/User/Profile/user';
import { Upload } from '../../../../models/upload';
import { StorageService } from '../../../../services/storage.service';
import { IdentityService } from '../../../../services/identity.service';
import { UserService } from '../../../../services/user.service';
import { UserResponse } from '../../../../models/User/Profile/userresponse';
import { Failure } from '../../../../models/Response/failure';
import { UserUpload } from '../../../../models/User/UserUpload/userupload';
import { Success } from '../../../../models/Response/success';

@Component({
  selector: 'app-laborer-home-details',
  templateUrl: './laborer-home-details.component.html',
  styleUrls: ['../../tenantStyle.css', '../../themeStyle.css']
})
export class LaborerHomeDetailsComponent {
  public model : User = new User();
    userName: string | undefined;
    profilePicture: Upload = {} as Upload;
    @ViewChild('Demo1') Demo1: ElementRef = {} as ElementRef;
    @ViewChild('Demo2') Demo2: ElementRef = {} as ElementRef;
    @ViewChild('Demo3') Demo3: ElementRef = {} as ElementRef;    
  
    constructor(private storageService: StorageService, private userService: UserService,
        private identityService: IdentityService){

    }
  
    ngOnInit(): void {
      var user = JSON.parse(this.storageService.getUser()) as Success;
      this.userName = user.response.identifier;

      this.identityService.getUserDetails(user.response.id)
      .subscribe((result: UserResponse) => {
        this.model = result.response;
      },error=>{
        let failure = error.error as Failure;
        console.log('failure: ' + JSON.stringify(failure));
      });
  
      this.userService.getUserUpload(user.response.id, 'PP').subscribe((result: UserUpload) => {
        let response = result.response;
        let extension = "";
        const extensions = new Set(['jpg', 'gif', 'png'])
        for(const item of extensions){
          if(response.name.indexOf(item) > -1){
            extension = item;
            break;
          }
        }
        let source = "data:image/" + extension + ";base64," + response.binary;
        response.source = source;
        this.profilePicture = response;
      },error=>{
        let failure = error.error as Failure;
        console.log('failure: ' + JSON.stringify(failure));
      });
    }

  public myFunction(id: number) {
    var x: any;
    if(id == 1)
      x = this.Demo1.nativeElement;
    else if(id == 2)
      x = this.Demo2.nativeElement;
    else if(id == 3)
      x = this.Demo3.nativeElement;
  
    if (x.className.indexOf("my-friend-show") == -1) {
      x.className += " my-friend-show";
      x.previousElementSibling.className += " my-friend-theme-d1";
    } else { 
      x.className = x.className.replace("my-friend-show", "");
      x.previousElementSibling.className = 
      x.previousElementSibling.className.replace(" my-friend-theme-d1", "");
    }
  }
}
