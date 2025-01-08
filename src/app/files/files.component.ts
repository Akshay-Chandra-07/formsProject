import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FilesService } from '../services/files.service';
import { HttpserviceService } from '../services/httpservice.service';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userFile } from '../interfaces/userFile';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-files',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesComponent implements OnInit, OnDestroy {
  constructor(
    private filesService: FilesService,
    private httpService: HttpserviceService,
    private userService: UsersService,
    private cdr: ChangeDetectorRef
  ) {}
  files = new FormData();
  userFiles: Array<userFile> | undefined;
  destroy$ = new Subject<void>();
  loggedUser: User | undefined;
  @Input() refreshed: boolean = false;

  ngOnInit(): void {
    const id = this.httpService.sendId();
    this.userService
      .getUser(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: User) => {
          this.loggedUser = data;
          console.log(this.loggedUser);
          if (this.loggedUser?.role == 'admin') {
            this.getAllUserFiles(id);
          } else {
            this.getUserFiles();
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  uploadForm = new FormGroup({
    fileInput: new FormControl(),
  });

  onFiles(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input);
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.files.append('files', input.files[i]);
      }
    }
  }

  onSubmit() {
    const id = this.httpService.sendId();
    this.filesService
      .sendFiles(this.files, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Object) => {
          console.log(data);
          if(this.loggedUser?.role == "admin"){
            this.getAllUserFiles(id)
          }else{
            this.getUserFiles();
          }
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.uploadForm.reset();
  }

  getAllUserFiles(id: string) {
    this.filesService.getAllUserFiles(id).subscribe({
      next: (data: userFile[]) => {
        console.log(data);
        this.userFiles = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUserFiles() {
    const id = this.httpService.sendId();
    this.filesService.getUserFiles(id).subscribe({
      next: (data: userFile[]) => {
        console.log(data);
        this.userFiles = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteFile(fileId: string) {
    console.log('delete');
    console.log(fileId);
    const id = this.httpService.sendId();
    this.filesService.deleteFileById(id, fileId).subscribe({
      next: (data:Object) => {
        console.log(data);
        this.getUserFiles();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  trackByFn(index: number, data: any): any {
    return data.id || null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
