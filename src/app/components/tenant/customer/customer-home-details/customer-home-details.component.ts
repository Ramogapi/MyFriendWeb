import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../../models/User/Profile/user';
import { Upload } from '../../../../models/upload';
import { StorageService } from '../../../../services/storage.service';
import { IdentityService } from '../../../../services/identity.service';
import { UserService } from '../../../../services/user.service';
import { Success } from '../../../../models/Response/success';
import { UserResponse } from '../../../../models/User/Profile/userresponse';
import { Failure } from '../../../../models/Response/failure';
import { UserUpload } from '../../../../models/User/UserUpload/userupload';
import { CodeLookUpResponse } from '../../../../models/LookUp/codelookupresponse';
import { CodeLookUp } from '../../../../models/LookUp/codelookup';
import { Favourite } from '../../../../models/favourite';
import { ToastService } from '../../../../services/toast.service';
import { Interest } from '../../../../models/User/Interest/interest';

@Component({
  selector: 'app-customer-home-details',
  templateUrl: './customer-home-details.component.html',
  styleUrls: ['../../tenantStyle.css', '../../themeStyle.css']
})
export class CustomerHomeDetailsComponent implements OnInit {
    public model : User = new User();
    userName: string | undefined;
    profilePicture: Upload = {} as Upload;
    interests: CodeLookUp[] = [];
    professions: CodeLookUp[] = [];
    public interest : Interest = new Interest();
    favourites: Favourite[] = [];
    searchKey: string = '';

    @ViewChild('Demo1') Demo1: ElementRef = {} as ElementRef;
    @ViewChild('Demo2') Demo2: ElementRef = {} as ElementRef;
    @ViewChild('Demo3') Demo3: ElementRef = {} as ElementRef; 
    @ViewChild('search') search: ElementRef<HTMLInputElement> = null!;   
  
    constructor(private storageService: StorageService, private userService: UserService,
        private identityService: IdentityService, private toastService: ToastService){

    }
  
    ngOnInit(): void {
      var user = JSON.parse(this.storageService.getUser()) as Success;
      this.userName = user.response.identifier;

      this.interest.userId = user.response.id;

      this.identityService.getCodeLookUps('Profession').subscribe((result: CodeLookUpResponse) => {
        this.professions = result.response;
      },error=>{
        let failure = error as Failure;
        console.log('failure: ' + JSON.stringify(failure));
      });

      this.identityService.getUserDetails(user.response.id)
      .subscribe((result: UserResponse) => {
        this.model = result.response;
      },error=>{
        let failure = error.error as Failure;
        console.log('failure: ' + JSON.stringify(failure));
      });

      this.userService.getUserInterests(user.response.id)
      .subscribe((result: CodeLookUpResponse) => {
        this.interests = result.response;
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

  addInterest(lookup: CodeLookUp): void {
    var item = this.favourites.find(item => item.code == lookup.code);
    if(item == null){
      const newTodoItem: Favourite = {
        id: lookup.id,
        name: lookup.name,
        code: lookup.code,
        completed: false
      };
      this.favourites.push(newTodoItem);
      this.saveInterests();
    }
  }

  deleteInterest(favourite: CodeLookUp): void {
      this.userService.deleteUserInterest(parseInt(favourite.id))
               .subscribe(result=>{
                this.ngOnInit();
                this.toastService.success('Delete successfully saved!');
               },error=>{
                let failure = error.error as Failure;
                this.toastService.error(failure.message);
                console.log('failure: ' + JSON.stringify(failure));
               });
  }

  saveInterests(): void {
    this.interest.professionCodes = [];
    this.favourites.forEach((key) => {
      this.interest.professionCodes.push(key.code);
    });
    this.userService.createUserInterests(this.interest)
               .subscribe(result=>{
                this.ngOnInit();
                this.toastService.success('Interest successfully saved!');
               },error=>{
                let failure = error.error as Failure;
                this.toastService.error(failure.message);
                console.log('failure: ' + JSON.stringify(failure));
               });
    
  }
}
