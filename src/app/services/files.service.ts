import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { userFile } from '../interfaces/userFile';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  sendFiles(files: FormData) {
    return this.http.post(`${this.apiUrl}/profile/upload`, files);
  }

  getUserFiles(): Observable<userFile[]> {
    console.log(`${this.apiUrl}/profile/files`);
    return this.http.get<userFile[]>(`${this.apiUrl}/profile/files`);
  }

  getAllUserFiles(): Observable<userFile[]> {
    return this.http.get<userFile[]>(`${this.apiUrl}/profile/allFiles`);
  }

  deleteFileById(fileId: string) {
    return this.http.delete(
      `${this.apiUrl}/profile/files/delete?fileId=${fileId}`,
    );
  }
}
