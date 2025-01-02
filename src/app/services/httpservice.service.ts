import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { RegisterResponse } from '../interfaces/register-response';
import { LoginResponse } from '../interfaces/login-response';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  constructor(private http: HttpClient,private route:ActivatedRoute) {}
  apiUrl = environment.apiUrl;
  curId:any;
  checkToken(){
    return sessionStorage.getItem('token');
  }
  setId(id:any){
    this.curId = id;
  }
  sendId(){
    return this.curId;
  }
  register(
    username: string,
    email:  string,
    name: string,
    password: string
  ): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/signup`, {
      username,
      email,
      name,
      password,
    });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password });
  }
}

/**
 1. router outlet
 2. move api url to environment.ts
 3. use OnPush in every component
 4. use interfaces, naming conventions, access modifiers 
 5. cancel the pending api if i navigate to another page
 7. Create a table with all the users, display them and provision to `edit` their details (add token to each request using interceptors)
  8. `async` pipe examples, use cases
  9. Create custom input form control component using `CustomValueAccessor`
  10. Create custom dropdown form control component using `CustomValueAccessor`
 */
