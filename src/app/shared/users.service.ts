import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, tap } from 'rxjs';

export interface User {
  id: number;
  email: string;
  password: string;
}
let id:number

@Injectable({ providedIn: 'root' })
export class UserService implements CanActivate{
  constructor(private http: HttpClient, public router: Router) {}

  public users: User[] = [
    { id: 1, email: 'admin@gmail.com', password: '12345' },
    { id: 2, email: 'test@mail.ru', password: 'testPassword' },
    { id: 3, email: 'homer99@gmail.com', password: 'simpson84' },
  ];
  /*
  userFetch(): Observable<User[]> {
    return this.http
      .get<User[]>(`http://localhost:3000/users`)
      .pipe(tap((user) => (this.users = user)));
  }
*/
  setUserId(userId: number) {
    localStorage.setItem('id', userId.toString());
  }

  isAuthorized(): boolean {
    const id = localStorage.getItem('id');
    if (id) {
      return true;
    }
    return false;
  }

  userExit() {
    const id = localStorage.getItem('id');
    if (id) {
      localStorage.removeItem('id');
    }
  }

  canActivate(): boolean {
    if (!this.isAuthorized()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

  verifyUser(login: string, password: string, registr?: boolean) {
    if (!registr) {
      for (let i = 0; i < this.users.length; i++) {
        if (
          this.users[i].email === login &&
          this.users[i].password === password
        ) {
          this.setUserId(this.users[i].id);
          return true;
        }
      }
      return false;
    } else {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === login) {
          return false;
        }
      }
      const newUser: User = {
        id: this.users[this.users.length - 1].id + 20,
        email: login,
        password,
      };
      this.users.push(newUser);
      this.setUserId(this.users[this.users.length - 1].id + 20);
      return true;
    }
  }
}
