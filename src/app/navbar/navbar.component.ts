import { Component, OnInit } from '@angular/core';
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
  token: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpserviceService
  ) {}
  ngOnInit(): void {}
  user() {
    return this.httpService.checkToken();
  }
  goHome() {
    const id = this.httpService.sendId();
    this.router.navigateByUrl(`/dashboard/${id}`);
  }
  goProfile() {
    const id = this.httpService.sendId();
    this.router.navigateByUrl(`/profile/${id}`);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
