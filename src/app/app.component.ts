import { AfterContentInit, AfterViewInit, Component } from '@angular/core';

import { UserService } from './shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit  {

  constructor(public UserService: UserService) {}

  authorized = false;

  ngAfterContentInit(): void {
   this.authorized = this.UserService.isAuthorized()
  }
  userExit(){
    this.UserService.userExit()
  }
}