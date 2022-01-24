import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usernameSource = new BehaviorSubject<string>("Guest");
  currentUsername = this.usernameSource.asObservable();

  private respSource = new BehaviorSubject<boolean>(true);
  methodResponse = this.respSource.asObservable();

  private roomSource = new BehaviorSubject<number>(-1);
  roomResponse = this.roomSource.asObservable();

  r!:boolean;

  constructor(private http:HttpClient) { }

  changeMessage(username: string) {
    this.usernameSource.next(username);
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

  postAddPlayer(username:string, roomId:number): Observable<any> {
    let url = 'http://localhost:8080/addPlayer/' + roomId.toString();
    this.http.post<any>('http://reqres.in/api/posts', { username: username }).subscribe(data => {
        this.respSource.next(data['ok']);
    })
    return this.methodResponse;
  }

  postAddGuest(roomId:number): Observable<any> {
    let url = 'http://localhost:8080/addGuest/' + roomId.toString();
    this.http.post<any>('http://reqres.in/api/posts', {}).subscribe(data => {
        this.respSource.next(data['ok']);
    })
    return this.methodResponse;
  }

  postAddRoom(nume:string, tip:string, admin:string, maxNr:number): Observable<any> {
    let url = 'http://localhost:8080/addRoom/';
    this.http.post<any>('http://reqres.in/api/posts', {nume: nume, tip: tip, admin: admin, maxNr: maxNr}).subscribe(data => {
        this.respSource.next(data['ok']);
        if (data['ok']) {
          this.roomSource.next(data['id']);
        } else {
          this.roomSource.next(-1);
        }
    })
    return this.roomResponse;
  }

}
