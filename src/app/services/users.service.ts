import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
  apiUrl = environment.apiUrl;
  getUsers(){
    return this.http.get(`${this.apiUrl}/dashboard`);
  }
  getUser(id:string):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/profile/${id}`);
  }
  updateDetails(id:string,name?:string,email?:string,oldPassword?:string,newPassword?:string):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/profile/${id}/update`,{name,email,oldPassword,newPassword});
  }
}
