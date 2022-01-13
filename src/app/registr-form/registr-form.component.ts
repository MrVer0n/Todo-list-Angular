import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-registr-form',
  templateUrl: './registr-form.component.html',
  styleUrls: ['./registr-form.component.scss'],
})
export class RegistrFormComponent implements OnInit {
  constructor(public UserService: UserService) {}

  login = '';
  password = '';
  passwordRepeat = '';
  warning = 0;

  ngOnInit(): void {
    //this.UserService.userFetch().subscribe(() => {});
  }

  onRegistr() {
    if (this.login && this.password) {
        if (this.password === this.passwordRepeat) {
          if (this.UserService.verifyUser(this.login)) {
          document.location.href = '/todoList';
        } else this.warning = 3;
      } else this.warning = 2;
    } else this.warning = 1;
  }
}
