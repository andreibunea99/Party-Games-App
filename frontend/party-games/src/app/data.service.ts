import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usernameSource = new BehaviorSubject<string>("Guest");
  currentUsername = this.usernameSource.asObservable();

  private usernameSource2 = new BehaviorSubject<string>("Andrei");
  currentUsername2 = this.usernameSource2.asObservable();

  private respSource = new BehaviorSubject<boolean>(true);
  methodResponse = this.respSource.asObservable();

  private roomSource = new BehaviorSubject<number>(-1);
  roomResponse = this.roomSource.asObservable();

  r!:boolean;

  idr!: number;

  constructor(private http:HttpClient) { }

  changeMessage(username: string) {
    this.usernameSource.next(username);
  }

  changeMessage2(username: string) {
    console.log("changed " + username);
    this.usernameSource2.next(username);
  }

  getUsername() {
    console.log("GETTING: " + this.usernameSource2);
    return this.usernameSource2;
  }

  getData(): Observable<any> {
    let url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url);
  }

  getRooms(): Observable<any> {
    let url = 'http://localhost:8080/getRoomsList';
    return this.http.get(url);
  }

  getRoomDetails(id:number): Observable<any> {
    let url = 'http://localhost:8080/roomDetails/' + id.toString();
    return this.http.get(url);
  }

  postLogin(username:string, password:string): boolean {
    let url = 'http://localhost:8080/login';
    this.http.post<any>(url, { 'username': username, 'password': password  }).subscribe(data => {
        this.respSource.next(data['ok']);
        this.r = data['ok'];
    })
    return this.r;
  }

  postRegister(username:string, password:string): boolean {
    let url = 'http://localhost:8080/register';
    this.http.post<any>(url, { username: username, password: password  }).subscribe(data => {
        this.respSource.next(data['ok']);
        this.r = data['ok'];
    })
    return this.r;
  }

  postAddPlayer(username:string, roomId:number): boolean {
    let url = 'http://localhost:8080/addPlayer';
    this.http.post<any>(url, { 'username': username, 'idCamera': roomId }).subscribe(data => {
        this.respSource.next(data['ok']);
        this.r = data['ok'];
      })
      return this.r;
  }

  postAddGuest(roomId:number): boolean {
    let url = 'http://localhost:8080/addGuest/';
    this.http.post<any>(url, {'idRoom': roomId}).subscribe(data => {
        this.respSource.next(data['ok']);
        this.r = data['ok'];
      })
      return this.r;
  }

  postAddRoom(nume:string, tip:string, admin:string, maxNr:number): number {
    let url = 'http://localhost:8080/addRoom/';
    this.http.post<any>(url, {'name': nume, 'type': tip, 'admin': admin, 'maxNumberOfPlayers': maxNr}).subscribe(data => {
        this.respSource.next(data['ok']);
        if (data['ok']) {
          this.roomSource.next(data['id']);
          this.idr = data['id'];
        } else {
          this.roomSource.next(-1);
          this.idr = -1;
        }
    })
    return this.idr;
  }

}
