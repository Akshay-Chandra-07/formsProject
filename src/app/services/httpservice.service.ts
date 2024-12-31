import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http:HttpClient) { }
  apiUrl = "http://localhost:5000/api/auth"
  register(username:any,email:any,name:any,password:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/signup`,{username,email,name,password})
  }
  login(username:any,password:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,{username,password})
  }
}
