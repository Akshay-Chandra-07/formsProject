import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';
import { RegisterResponse } from '../interfaces/register-response';

@Component({
  selector: 'app-signup',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private http: HttpserviceService) {}

  signForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  onSubmit(form: FormGroup) {
    this.http
      .register(
        form.value.username,
        form.value.email,
        form.value.name,
        form.value.password
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: RegisterResponse) => {
          console.log(data.msg);
          if (data.msg === 'User created') {
            this.router.navigateByUrl('/login');
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
