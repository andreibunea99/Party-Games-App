import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginQuery } from '../classes/loginQuery';
import { DataService } from '../data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  username!: string;
  title!: string;

  recv!: LoginQuery;

  constructor(private data: DataService) {}

  ngOnInit() {
    // this.data.getData().subscribe(data => {
    //   this.recv = data;
    // })
    this.data.currentUsername.subscribe(username => this.username = username);
    this.data.changeMessage(this.username);
    this.data.changeMessage2(this.username);
    console.log(this.username);
  }


}
