import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpserviceService,
  ) {}
  ngOnInit(): void {
    // this.token = this.httpService.checkToken();
  }
  user() {
    return sessionStorage.getItem('token');
  }
  goHome() {
    const id = this.httpService.sendId();
    this.router.navigateByUrl(`/dashboard`);
  }
  goProfile() {
    const id = this.httpService.sendId();
    this.router.navigateByUrl(`/profile`);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
