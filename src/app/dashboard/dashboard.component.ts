import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpserviceService } from '../services/httpservice.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  data : any;

  constructor(private userService:UsersService,private httpService:HttpserviceService,private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.data = this.userService.getUsers()
    .pipe(catchError((err)=>{
      console.log(err);
      this.router.navigateByUrl('/login');
      return err;
    }))
    this.httpService.setId(this.route.snapshot.paramMap.get('id'));
  }
}
