import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(public router: Router, private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      inputUsername: formBuilder.control(''),
      inputPassword: formBuilder.control('')
    });}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.registerForm.value.inputUsername)
    // this.router.navigate(['login']);
  }
}
