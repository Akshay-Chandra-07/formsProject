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
import { FilesService } from '../services/files.service';

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
  files: FormData | undefined;
  destroy$ = new Subject<void>();
  editToken: boolean = false;
  editProfilePicToken: boolean = false;
  isRefreshed: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private httpService: HttpserviceService,
  ) {}

  editForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id')!;
    this.data = this.userService.getUser().pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.log(error);
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        return of();
      }),
    );
    this.httpService.setId(this.route.snapshot.paramMap.get('id')!);
    this.isRefreshed = true;
  }

  uploadProfilePicture = new FormGroup({
    picture: new FormControl(),
  });

  onFiles(event: any) {
    this.files = new FormData();
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files.append('picture', input.files[0]);
    }
  }

  editDetails() {
    this.editToken = !this.editToken;
  }

  editProfilePic() {
    this.editProfilePicToken = !this.editProfilePicToken;
  }

  onPictureSubmit() {
    this.data = this.userService.updatePicture(this.files!).pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.log(error);
        return of();
      }),
    );
    this.uploadProfilePicture.reset();
    this.editProfilePic();
  }

  onSubmit() {
    this.data = this.userService
      .updatePassowrd(
        this.editForm.value.oldPassword!,
        this.editForm.value.newPassword!,
      )
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.log(error);
          sessionStorage.removeItem('token');
          this.router.navigateByUrl('/login');
          return of();
        }),
      );
    this.editDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
