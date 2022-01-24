import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  r!: boolean;

  constructor(public router: Router, private data: DataService, private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      inputUsername: formBuilder.control(''),
      inputPassword: formBuilder.control('')
    });}

  ngOnInit(): void {}

  onSubmit() {
    this.r = this.data.postRegister(this.registerForm.value.inputUsername, this.registerForm.value.inputPassword);
    if (this.r) {
      this.data.changeMessage(this.registerForm.value.inputUsername);
      this.router.navigate(['login']);
    } else {
      this.registerForm.value.inputUsername = null;
      this.registerForm.value.inputPassword = null;
    }
    
  }
}
