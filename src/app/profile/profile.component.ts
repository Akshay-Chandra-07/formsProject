import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntil, Subject, Observable, catchError, of } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { User } from '../interfaces/user';
import { HttpserviceService } from '../services/httpservice.service';
import { FilesComponent } from '../files/files.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    FilesComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  data: Observable<User> | undefined;
  id: string = '';
  destroy$ = new Subject<void>();
  editToken: boolean = false;
  isRefreshed: boolean = false;
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpserviceService
  ) {}

  editForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', Validators.email),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.data = this.userService.getUser(this.id).pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.log(error);
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        return of();
      })
    );
    this.httpService.setId(this.route.snapshot.paramMap.get('id')!);
    this.isRefreshed = true;
  }

  editDetails() {
    this.editToken = !this.editToken;
  }

  onSubmit() {
    this.data = this.userService
      .updateDetails(
        this.id,
        this.editForm.value.name ?? undefined,
        this.editForm.value.email ?? undefined,
        this.editForm.value.oldPassword ?? undefined,
        this.editForm.value.newPassword ?? undefined
      )
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.log(error);
          sessionStorage.removeItem('token');
          this.router.navigateByUrl('/login');
          return of();
        })
      );
    this.editDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
