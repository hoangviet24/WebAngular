import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrlImage = 'https://localhost:7055/api/Animal'; 
  private apiUrlLogin = 'https://localhost:7055/api/User/Login';
  private apiUrlRegister = 'https://localhost:7055/api/User/Post';
  selectedFile: File | null = null;
  constructor(private http: HttpClient) {}

  // Upload file
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrlImage}/Post-file`, formData ,{ responseType: 'text' }); 
  }

  // Lấy danh sách hoặc xem ảnh cụ thể
  getFile(): Observable<any> {
    const url =  this.apiUrlImage+'/view-file';
    return this.http.get(url);
  }
  getdetailFile(fileName: string): string {
    return `https://localhost:7055/api/Animal/view-file?fileName=${fileName}`;
  }
  deleteFile(fileName: string): Observable<any> {
    return this.http.delete(`${this.apiUrlImage}/delete/${fileName}`);
  }
  //Login
  login(username: string, password: string): Observable<User> {
    const url = `${this.apiUrlLogin}?userName=${username}&password=${password}`;
    return this.http.get<User>(url);
  }
  register(user: User): Observable<any> {
    const url = this.apiUrlRegister;
    return this.http.post(url, user);
  }
}
