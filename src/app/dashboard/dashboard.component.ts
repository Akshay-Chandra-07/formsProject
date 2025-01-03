import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpserviceService } from '../services/httpservice.service';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  data: Observable<Array<User>> | undefined;

  constructor(
    private userService: UsersService,
    private httpService: HttpserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.data = this.userService.getUsers().pipe(
      catchError((err) => {
        console.log(err);
        this.router.navigateByUrl('/login');
        return of([]);
      })
    );
    this.httpService.setId(this.route.snapshot.paramMap.get('id')!);
    // Add below line to test the global error handler
    // throw new Error('Method not implemented.');
  }

  track(index:number,data:User):number{
    return data.id;
  }
}
