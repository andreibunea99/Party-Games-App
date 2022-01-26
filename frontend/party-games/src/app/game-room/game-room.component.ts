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

  roomAdmin!: string;

  waitedSol!: string;

  prompt!: string;

  codeForm!: FormGroup;
  codeFormAdmin!: FormGroup;

  subject!: string;

  subjects: Array<string> = ['mar', 'masina', 'fotbal', 'management', 'tenis', 'copac'];

  constructor(private data: DataService, public router: Router, private formBuilder: FormBuilder) {
    this.codeForm = this.formBuilder.group({
      inputUsername: formBuilder.control(''),
    })
    this.codeFormAdmin = this.formBuilder.group({
      inputUsername: formBuilder.control(''),
    })
   }

  ngOnInit(): void {
    this.isAdmin = false;
    this.prompt = "Nothing so far.";
    this.data.getLogged().subscribe(data => {
      this.username = data['user'];
      console.log("USERNAME: " + this.username);
    
      this.data.getRoomed().subscribe(data => {
        this.room = data['room'];
        console.log("ROOM: " + this.room);
        this.data.getRoomDetails(this.room).subscribe(data => {
          console.log("HEEEEEEE");
          this.recv = data['players'];
          this.roomAdmin = data['admin'];
          if (this.roomAdmin == this.username) {
            this.isAdmin = true;
            this.subject = this.subjects[Math.floor(Math.random() * this.subjects.length)];
            this.data.setSol(this.subject, this.room);
            console.log(this.subject);
          } else {
            this.data.getTask(this.room).subscribe(data => {
              this.prompt = data['task'];
            })
          }
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
    if (this.roomAdmin == this.username) {
      console.log("E ADMIN");
      this.data.postAddTask(this.codeFormAdmin.value.inputUsername, this.room);
    } else {
      console.log("NU E ADMIN");
      this.data.getSol(this.room).subscribe(data => {
        this.waitedSol = data['sol'];
        console.log(this.waitedSol);
        if (this.waitedSol == this.codeForm.value.inputUsername) {
          console.log("GHICI");
        }
      })
    }
    console.log(this.codeForm.value.inputUsername);
  }

}
