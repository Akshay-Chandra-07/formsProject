import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private router:Router,private http:HttpserviceService){}

  signForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    username : new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
    password : new FormControl('',[Validators.required,Validators.minLength(4)])
  })

  onSubmit(form:FormGroup){
    // if(sessionStorage.getItem(form.value.username)){
    //   window.alert('Username already exists!')
    // }else{
    //   sessionStorage.setItem(form.value.username,JSON.stringify([form.value.email,form.value.name,form.value.password]))
    // console.log(this.signForm.value.username)
      // console.log(JSON.parse(JSON.stringify([form.value.email,form.value.name,form.value.password])))
      // }
      this.http.register(form.value.username,form.value.email,form.value.name,form.value.password).subscribe({
        next:(data)=>{
          console.log(data)
          if(data.msg==="User created"){
            this.router.navigateByUrl('/login')
          }
        },
        error:(e)=>{
          console.log(e)
        }
      })
      // this.router.navigateByUrl('/login')
  }
  
  onLogin(){
    this.router.navigateByUrl('/login')
  }
}
