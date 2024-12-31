import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router:Router,private http:HttpserviceService){}

  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
        password : new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)])
  })

  onSubmit(form:FormGroup){
    // if(sessionStorage.getItem(form.value.username)){
    //   // console.log(sessionStorage.getItem(this.loginForm.value.username))
    //   this.val = sessionStorage.getItem(form.value.username)
    //   if(JSON.parse(this.val)[2]==form.value.password){
    //     window.alert("Logged in!")
    //     this.loginForm.reset()
    //   }
    //   else{
    //     window.alert("Invalid Password")
    //   }
    // }else{
    //   window.alert("Invalid Credentials")
    // }
    this.http.login(form.value.username,form.value.password).subscribe({
      next:(data)=>{
        console.log(data)
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

  onSignup(){
    this.router.navigateByUrl('/signup')
  }
}
