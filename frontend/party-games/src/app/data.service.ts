import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usernameSource = new BehaviorSubject<string>("Guest");
  currentUsername = this.usernameSource.asObservable();

  constructor() { }

  changeMessage(username: string) {
    this.usernameSource.next(username);
  }

}
