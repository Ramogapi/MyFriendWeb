import { Component } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css'
})
export class SignOutComponent {

  constructor(private tokenService: StorageService) {
  }

  ngOnInit() {
    this.tokenService.signOut();
  }
}
