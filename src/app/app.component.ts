import { AfterViewInit, Component } from '@angular/core';

import { UserService } from './shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit  {

  constructor(public UserService: UserService) {}

  authorized = false;

  ngAfterViewInit(): void {
   this.authorized = this.UserService.isAuthorized()
  }
  userExit(){
    this.UserService.userExit()
  }


}