import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  username!: string;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.currentUsername.subscribe(username => this.username = username);
  }


}
