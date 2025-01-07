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
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomDropdownComponent } from '../custom-dropdown/custom-dropdown.component';

@Component({
  selector: 'app-signup',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomInputComponent,
    CustomDropdownComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  roles: Array<string> = ['normal', 'admin'];

  constructor(private router: Router, private http: HttpserviceService) {}

  signForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    role: new FormControl('normal'),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  onSubmit(form: FormGroup) {
    console.log(form);
    console.log(this.signForm);

    this.http
      .register(
        form.value.username,
        form.value.email,
        form.value.name,
        form.value.role,
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
