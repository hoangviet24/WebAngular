import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../components/User';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public apiUrlImage = 'https://localhost:7055/api/Animal'; 
  private apiUrlLogin = 'https://localhost:7055/api/User/Login';
  private apiUrlRegister = 'https://localhost:7055/api/User/Post';
  private apiFavorite = 'https://localhost:7055/api/Fav';
  selectedFile: File | null = null;
  constructor(private http: HttpClient) {}

  // Upload file
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrlImage}/Post-file`, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    });
  }
  
  // Lấy danh sách hoặc xem ảnh cụ thể
  getFile(): Observable<string[]> {
    const url = this.apiUrlImage + `/view-file`;
    return this.http.get<string[]>(url);
  }
  getAnimal(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlImage}/${id}`);
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
