import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

export interface User {
  id: number;
  email: string;
  password: string;
}
let id:number

@Injectable({ providedIn: 'root' })
export class UserService {
  
  constructor(private http: HttpClient) {}

  public users: User[] = [
    { id: 1, email: 'admin@gmail.com', password: '12345' },
    { id: 2, email: 'test@mail.ru', password: 'testPassword' },
    { id: 3, email: 'homer99@gmail.com', password: 'simpson84' }
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

  verifyUser(login: string, password?: string) {
    if (password) {
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
      this.setUserId(this.users[this.users.length-1].id+20);
      return true;
    }
  }
}
