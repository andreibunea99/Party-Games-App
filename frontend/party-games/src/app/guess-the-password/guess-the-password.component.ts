import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess-the-password',
  templateUrl: './guess-the-password.component.html',
  styleUrls: ['./guess-the-password.component.css']
})

export class GuessThePasswordComponent implements OnInit {

  roomsList:Array<[string, number]> = [];
  playersList:Array<Array<string>> = [];
  playersScores:Array<Array<number>> = [];
  guestScore:Array<number> = [];
  displayList:Array<string> = [];

  selectedRoom = 0;
  selected = false;

  constructor() { }

  ngOnInit(): void {
    this.roomsList = [['Camera 1', 0], ['Camera 2', 1], ['Camera 3', 2], ['Camera 4', 3], ['Camera 5', 4], ['Camera 6', 5], ['Camera 7', 6], ['Camera 8', 7], ['Camera 9', 8]];
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
