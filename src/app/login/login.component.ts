import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy,OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';
import { LoginResponse } from '../interfaces/login-response';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  constructor(private router: Router, private http: HttpserviceService) {}
  private destroy$ = new Subject<void>();
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
  });

  onSubmit() {
    const form = this.loginForm;
    console.log(form);
    
    this.http
    .login(form.value.username!, form.value.password!)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        console.log(data.msg);
        sessionStorage.setItem('token', data.token!);
        this.router.navigateByUrl(`/dashboard/${data.id}`)
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  onSignup() {
    this.router.navigateByUrl('/signup');
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
