import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {

  playersList:Array<Array<string>> = [];
  playersScores:Array<Array<number>> = [];
  guestScore:Array<number> = [];
  guestNumber:Array<number> = [];
  displayList:Array<string> = [];
  username!: string;
  recv!: Array<string>;

  room!: number;
  isAdmin!: boolean;

  prompt!: string;

  codeForm!: FormGroup;

  subjects: Array<string> = ['mar', 'masina', 'fotbal', 'management', 'tenis', 'copac'];

  constructor(private data: DataService, public router: Router, private formBuilder: FormBuilder) {
    this.codeForm = this.formBuilder.group({
      inputUsername: formBuilder.control(''),
    })
   }

  ngOnInit(): void {
    this.prompt = "Nothing so far.";
    this.data.getLogged().subscribe(data => {
      this.username = data['user'];
      // if (data['admin'] == 'yes') {
      //   this.isAdmin = true;
      //   console.log("E ADMIN");
      // }
      console.log("USERNAME: " + this.username);
    })
    this.data.getRoomed().subscribe(data => {
      this.room = data['room'];
      console.log("ROOM: " + this.room);
      this.data.getRoomDetails(this.room).subscribe(data => {
        console.log("HEEEEEEE");
        this.recv = data['players'];
        console.log("Players:");
        console.log(data['players']);
        this.playersList[this.room] = [];
        this.playersScores[this.room] = [];
        for (let i = 0; i < this.recv.length; i++) {
          this.playersList[this.room][i] = JSON.parse(this.recv[i])[0]['name'];
          this.playersScores[this.room][i] = Number(JSON.parse(this.recv[i])[0]['score']);
        }
        this.guestScore[this.room] = data['guestScore'];
        this.guestNumber[this.room] = data['guestsNr'];
      })
      this.getList();
    })
    
  }

  getList() {
    this.displayList = [];
    for (let i = 0; i < this.playersList[this.room].length; i++) {
      this.displayList[i] = this.playersList[this.room][i].concat(" .................................... ").concat(this.playersScores[this.room][i].toString());
    }
    this.displayList[this.playersList[this.room].length] = "Guests" + "[" + this.guestNumber[this.room] + "]" + "................................. " + this.guestScore[this.room].toString();
    return this.displayList;
    // return [];
  }

  onSubmit() {
    console.log(this.codeForm.value.inputUsername);
  }

}
