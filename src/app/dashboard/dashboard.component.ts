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
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CustomInputComponent, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: Array<User> | undefined;
  loggedUser: Observable<User> | undefined;
  isAdmin: boolean = false;
  destroy$ = new Subject<void>();
  refreshTable: boolean = false;
  editToggle: boolean = false;
  userData: any;

  constructor(
    private userService: UsersService,
    private httpService: HttpserviceService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.httpService.setId(this.route.snapshot.paramMap.get('id')!);
    this.loggedUser = this.userService
      .getUser(this.httpService.sendId())
      .pipe(takeUntil(this.destroy$));
    // Add below line to test the global error handler
    // throw new Error('Method not implemented.');
    this.loadDashboard();
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

  editUser(id: number) {
    this.editToggle = !this.editToggle;
  }

  loadDashboard() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.refreshTable = true;
        console.log(data);

        this.data = data;
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
