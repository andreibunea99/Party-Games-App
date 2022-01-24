import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;

  loginForm!: FormGroup;

  r!: boolean;

  constructor(public router: Router, private data: DataService, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      inputUsername: formBuilder.control(''),
      inputPassword: formBuilder.control('')
    });
  }

  ngOnInit(): void {
    this.data.currentUsername.subscribe(username => this.username = username);
  }

  onSubmit() {
    this.r = this.data.postLogin(this.loginForm.value.inputUsername, this.loginForm.value.inputPassword);
    if (this.r) {
      this.data.changeMessage(this.loginForm.value.inputUsername);
      this.router.navigate(['games']);
    }
  }

}
