import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { deleteResponse } from '../interfaces/delete-response';
import * as streamSaver from 'streamsaver';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/dashboard/home`);
  }
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/single-user`);
  }

  updatePicture(files: FormData): Observable<User> {
    console.log('dalksjfl');

    return this.http.post<User>(`${this.apiUrl}/profile/picture-update`, files);
  }

  deleteUser(id: number) {
    return this.http.delete<Object>(`${this.apiUrl}/profile/${id}/delete`);
  }
  updatePassowrd(oldPassword: string, newPassword: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile/update-password`, {
      oldPassword,
      newPassword,
    });
  }

  updateNameEmail(id: any, name: any, email: any) {
    return this.http.put(`${this.apiUrl}/profile/update-name-email`, {
      id,
      name,
      email,
    });
  }

  downloadExcelStream(): void {
    fetch(`${this.apiUrl}/dashboard/download`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error downloading file');
        }
  
        // Create a writable stream using StreamSaver
        const fileStream = streamSaver.createWriteStream('dashboard users.xlsx');
        const writer = fileStream.getWriter();
        const reader = res.body?.getReader();
  
        const pump = () => {
          reader?.read().then(({ done, value }) => {
            if (done) {
              console.log('Download complete');
              writer.close(); // Close the writable stream when done
              return;
            }
            console.log('Writing chunk...');
            writer.write(value); // Write chunks to the stream
            pump(); // Continue pumping the next chunk
          });
        };
  
        pump(); // Start reading and writing
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
      });
  }  
}
