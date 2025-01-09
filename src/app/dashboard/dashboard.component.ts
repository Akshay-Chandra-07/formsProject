import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { HttpserviceService } from '../services/httpservice.service';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CustomInputComponent, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: Array<User> = [];
  loggedUser: Observable<User> | undefined;
  isAdmin: boolean = false;
  destroy$ = new Subject<void>();
  refreshTable: boolean = false;
  editToggle: number | undefined;
  editUserId: number | undefined;

  constructor(
    private userService: UsersService,
    private httpService: HttpserviceService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.loggedUser = this.userService.getUser().pipe(takeUntil(this.destroy$));
    // Add below line to test the global error handler
    // throw new Error('Method not implemented.');
    this.loadDashboard();
  }

  editForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
  });

  downloadData() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data); //Creating an excel sheet from data
    const wb: XLSX.WorkBook = XLSX.utils.book_new(); //generating a new excel workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); //adding that sheet to the new workboo
    XLSX.writeFile(wb, 'userslist.xlsx'); //downloading the workbook from the browser
  }

  deleteUser(id: number) {
    console.log(id);
    this.refreshTable = false;
    this.userService.deleteUser(id).subscribe({
      next: (data: Object) => {
        console.log(data);
        this.loadDashboard();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editUser(id: number, userid: number) {
    this.editToggle = id;
    this.editUserId = userid;
  }

  cancelEdit() {
    this.editForm.reset();
    this.editToggle = undefined;
  }

  onEditFormSubmit() {
    this.userService
      .updateNameEmail(
        this.editUserId,
        this.editForm.controls.name.value,
        this.editForm.controls.email.value,
      )
      .subscribe({
        next: (data: Object) => {
          console.log(data);
          this.loadDashboard();
        },
        error(error: any) {
          console.log(error);
        },
      });
  }

  loadDashboard() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.refreshTable = true;
        console.log(data);

        this.data = [...data];
        // this.data = [...this.data]
        console.log(this.data);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  trackByFn(index: number, data: any): any {
    return data.id || index;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
