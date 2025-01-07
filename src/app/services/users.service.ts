import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { deleteResponse } from '../interfaces/delete-response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/dashboard/home`);
  }
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/${id}`);
  }
  deleteUser(id: number) {
    return this.http.delete<Object>(`${this.apiUrl}/profile/${id}/delete`);
  }
  updateDetails(
    id: string,
    name?: string,
    email?: string,
    oldPassword?: string,
    newPassword?: string
  ): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile/${id}/update`, {
      name,
      email,
      oldPassword,
      newPassword,
    });
  }
}
