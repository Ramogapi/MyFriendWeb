import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IdentityService } from '../../../services/identity.service';
import { Failure } from '../../../models/Response/failure';
import { CodeLookUpResponse } from '../../../models/LookUp/codelookupresponse';
import { CodeLookUp } from '../../../models/LookUp/codelookup';
import { Generator } from '../../../models/generator';
import { Favourite } from '../../../models/favourite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: '../identityStyle.css'
})
export class RegisterComponent implements OnInit {
    favourites: Favourite[] = [];
    searchKey: string = '';
    professions: CodeLookUp[] = [];
    @ViewChild('search') search: ElementRef<HTMLInputElement> = null!;

    constructor(private identityService: IdentityService, private router: Router) { }

    ngOnInit(): void {
        this.favourites = [];
        const storedInterests = localStorage.getItem('interests');
        if (storedInterests) {
            this.favourites = JSON.parse(storedInterests);
        }
        this.identityService.getCodeLookUps('Profession').subscribe((result: CodeLookUpResponse) => {
          this.professions = result.response;
        },error=>{
          let failure = error as Failure;
          console.log('failure: ' + JSON.stringify(failure));
        });
    }

    addInterest(lookup: CodeLookUp): void {
      var item = this.favourites.find(item => item.code == lookup.code);
      if(item == null){
        const newTodoItem: Favourite = {
          id: Generator.newGuid(),
          name: lookup.name,
          code: lookup.code,
          completed: false
        };
        this.favourites.push(newTodoItem);
        this.saveInterests();
      }
    }

    deleteInterest(favourite: Favourite): void {
        this.favourites = this.favourites.filter(item => item.code !== favourite.code);
        this.saveInterests();
    }

    saveInterests(): void {
      localStorage.setItem('interests', JSON.stringify(this.favourites));
    }

    public customer(){
      this.router.navigate(['/registration/customer']);
    }

    public laborer(){
      this.router.navigate(['/registration/laborer']);
    }
}