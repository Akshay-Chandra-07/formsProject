import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  sendFiles(files: FormData, id: string) {
    return this.http.post(`${this.apiUrl}/profile/${id}/upload`, files);
  }

  getUserFiles(id: string) {
    console.log(`${this.apiUrl}/profile/${id}/files`);
    return this.http.get(`${this.apiUrl}/profile/${id}/files`);
  }

  getAllUserFiles(id: string) {
    return this.http.get(`${this.apiUrl}/profile/${id}/allFiles`);
  }

  deleteFileById(id: string, fileId: string) {
    return this.http.delete(
      `${this.apiUrl}/profile/${id}/files/delete?fileId=${fileId}`
    );
  }
}
