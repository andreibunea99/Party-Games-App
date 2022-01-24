import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  username!: string;

  loginForm!: FormGroup;

  r!: number;

  constructor(public router: Router, private data: DataService, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      inputName: formBuilder.control(''),
      inputType: formBuilder.control('Private/Public'),
      inputMaxnr: formBuilder.control('')
    });
  }

  ngOnInit(): void {
    this.data.currentUsername.subscribe(username => this.username = username);
  }

  onSubmit() {
    this.r = this.data.postAddRoom(this.loginForm.value.inputName, this.loginForm.value.inputType, this.username, this.loginForm.value.inputMaxnr);
    if (this.r) {
      this.data.changeMessage(this.loginForm.value.inputUsername);
      // this.router.navigate(['game-screen']);
      console.log("ok");
    }
  }

}
