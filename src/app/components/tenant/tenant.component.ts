import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Success } from '../../models/Response/success';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Upload } from '../../models/upload';
import { Failure } from '../../models/Response/failure';
import { UserUpload } from '../../models/User/UserUpload/userupload';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenantStyle.css', './themeStyle.css']
})
export class TenantComponent implements OnInit {
  userName: string | undefined;
  profilePicture: Upload = {} as Upload;  
  @ViewChild('navDemo') navDemo: ElementRef = {} as ElementRef;

  constructor(private storageService: StorageService, private userService: UserService,
    private router: Router){

  }

  ngOnInit(): void {
    var user = JSON.parse(this.storageService.getUser()) as Success;
    this.userName = user.response.identifier;

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

  public account() {
    var user = JSON.parse(this.storageService.getUser()) as Success;
    if(user.response.roles.indexOf('C') > -1)
      this.router.navigate(['/h/tenant-account']);
    else if(user.response.roles.indexOf('L') > -1)
      this.router.navigate(['/h/tenant-account']);
  }  

  public openNav() {
    var x = this.navDemo.nativeElement;
    if (x.className.indexOf("my-friend-show") == -1) {
      x.className += " my-friend-show";
    } else { 
      x.className = x.className.replace(" my-friend-show", "");
    }
  }
}
