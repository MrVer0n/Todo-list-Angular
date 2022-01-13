import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(public UserService: UserService) {}

  login = '';
  password = '';
  incorrect = false;

  ngOnInit(): void {
    //this.UserService.userFetch().subscribe(() => {});
  }

  onLogin() {
    if (this.login && this.password) {
      if (this.UserService.verifyUser(this.login, this.password)) {
        document.location.href = '/todoList';
      } else {
        this.incorrect = true;
      }
    } else {
      this.incorrect = true;
    }
  }
}