import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginQuery } from '../classes/loginQuery';
import { roomsQuery } from '../classes/roomsQuery';
import { DataService } from '../data.service';

@Component({
  selector: 'app-guess-the-password',
  templateUrl: './guess-the-password.component.html',
  styleUrls: ['./guess-the-password.component.css']
})

export class GuessThePasswordComponent implements OnInit {

  roomsList:Array<[number, string, string, string, number, number, number]> = [];
  // roomsList:Array<roomsQuery> = [];
  playersList:Array<Array<string>> = [];
  playersScores:Array<Array<number>> = [];
  guestScore:Array<number> = [];
  guestNumber:Array<number> = [];
  displayList:Array<string> = [];

  recv!: Array<string>;

  item!: roomsQuery;

  chestie!: string;

  username!: string;

  r!: boolean;

  codeForm!: FormGroup;

  totalSize!: 0;

  selectedRoom = 0;
  selected = false;

  constructor(private data: DataService, public router: Router, private formBuilder: FormBuilder) { 
    this.codeForm = this.formBuilder.group({
      inputUsername: formBuilder.control(''),
    })
  }

  ngOnInit(){

    // this.data.currentUsername2.subscribe(username => this.username = username);
    // this.data.currentUsername.subscribe(username => this.username = username);
    this.data.getLogged().subscribe(data => {
      this.username = data['user'];
      console.log("USERNAME: " + this.username);
    })
    // console.log(this.data.getUsername());


    this.data.getRooms().subscribe(data => {
      this.recv = data['rooms'];
      for (let i = 0; i < this.recv.length; i++) {
        this.roomsList[i] = [(JSON.parse(this.recv[i]).ID).toString(), (JSON.parse(this.recv[i]).roomName).toString(), (JSON.parse(this.recv[i]).adminId).toString(), (JSON.parse(this.recv[i]).roomType).toString(), (JSON.parse(this.recv[i]).numberOfPlayers).toString(), (JSON.parse(this.recv[i]).maximumNumberOfPlayers).toString(), (JSON.parse(this.recv[i]).guestsNumber).toString()];
      }
    })

  }

  ocClickRoom(id: number) {
    this.selectedRoom = id;
    this.selected = true;
    this.data.getRoomDetails(id).subscribe(data => {
      this.recv = data['players'];
      console.log("Players:");
      console.log(data['players']);
      this.playersList[id] = [];
      this.playersScores[id] = [];
      for (let i = 0; i < this.recv.length; i++) {
        this.playersList[id][i] = JSON.parse(this.recv[i])[0]['name'];
        this.playersScores[id][i] = Number(JSON.parse(this.recv[i])[0]['score']);
      }
      this.guestScore[id] = data['guestScore'];
      this.guestNumber[id] = data['guestsNr'];
    })
    this.getList();
  }

  getList() {
    this.displayList = [];
    for (let i = 0; i < this.playersList[this.selectedRoom].length; i++) {
      this.displayList[i] = this.playersList[this.selectedRoom][i].concat(" .................................... ").concat(this.playersScores[this.selectedRoom][i].toString());
    }
    this.displayList[this.playersList[this.selectedRoom].length] = "Guests" + "[" + this.guestNumber[this.selectedRoom] + "]" + "................................. " + this.guestScore[this.selectedRoom].toString();
    return this.displayList;
  }

  joinButton(id: number) {
    // console.log("ENTERING JOIN " + id.toString());
    // this.selectedRoom = id;
    // this.data.getRoomDetails(id).subscribe(data => {
    //   console.log(".............");
    //   this.recv = data['players'];
    //   console.log("Players:");
    //   console.log(data['players']);
    //   this.playersList[id] = [];
    //   this.playersScores[id] = [];
    //   for (let i = 0; i < this.recv.length; i++) {
    //     this.playersList[id][i] = JSON.parse(this.recv[i])[0]['name'];
    //     this.playersScores[id][i] = Number(JSON.parse(this.recv[i])[0]['score']);
    //   }
    //   this.guestScore[id] = data['guestScore'];
    //   this.guestNumber[id] = data['guestsNr'];
    // })
    console.log("ID ACC: " + id.toString());
    console.log(this.playersList[id]);
    console.log(this.playersList);
    if (!this.playersList[id] || this.playersList[id].indexOf(this.username) == -1) {
      this.r = this.data.postAddPlayer(this.username, id);
      console.log("nu exista");
      this.router.navigate(['game-room']);
    } else {
      this.router.navigate(['game-room']);
    }
  }

  guestButton(id: number) {
    this.r = this.data.postAddGuest(id);
    console.log(this.r);
}

  addRoom() {
    this.router.navigate(['create-room']);
  }

}
