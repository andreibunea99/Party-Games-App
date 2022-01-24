import { Component, OnInit } from '@angular/core';
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

  totalSize!: 0;

  selectedRoom = 0;
  selected = false;

  constructor(private data: DataService) { }

  ngOnInit(): void {

    this.data.getRooms().subscribe(data => {
      this.recv = data['rooms'];
      for (let i = 0; i < this.recv.length; i++) {
        this.roomsList[i] = [(JSON.parse(this.recv[i]).ID).toString(), (JSON.parse(this.recv[i]).roomName).toString(), (JSON.parse(this.recv[i]).adminId).toString(), (JSON.parse(this.recv[i]).roomType).toString(), (JSON.parse(this.recv[i]).numberOfPlayers).toString(), (JSON.parse(this.recv[i]).maximumNumberOfPlayers).toString(), (JSON.parse(this.recv[i]).guestsNumber).toString()];
      }
    })

    for (let i = 0; i < 9; i++) {
      this.playersList[i] = ["Ana", "Rares", "Bogdan"];
      this.playersScores[i] = [100, 20, 5];
      this.guestScore[i] = 10;
    }
  }

  ocClickRoom(id: number) {
    console.log(id);
    this.selectedRoom = id;
    this.getList()
    this.selected = true;
    this.data.getRoomDetails(id).subscribe(data => {
      this.recv = data['players'];
      console.log(data);
      // this.playersList[id] = data['players'];
      // this.guestScore[id] = data['guestScore'];
      // this.guestNumber[id] = data['guestsNr'];
    })
  }

  getList() {
    this.displayList = [];
    for (let i = 0; i < this.playersList[this.selectedRoom].length; i++) {
      this.displayList[i] = this.playersList[this.selectedRoom][i].concat(" .................................... ").concat(this.playersScores[this.selectedRoom][i].toString());
    }
    this.displayList[this.playersList[this.selectedRoom].length] = "Guests .................................... " + this.guestScore[this.selectedRoom].toString();
    return this.displayList;
  }

}
