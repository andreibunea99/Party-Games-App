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
    this.data.changeMessage(this.loginForm.value.inputUsername);
    this.router.navigate(['games']);
  }

}
