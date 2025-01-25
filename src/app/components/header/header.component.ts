import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthServiceComponent } from '../auth-service/auth-service.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private http: HttpClient, private authService: AuthServiceComponent){}
  username: string |null = null;
    // Danh sách động vật
    animal: any[] = [];
    // Dữ liệu tìm kiếm
    searchQuery: string = '';
  getAnimal(): Observable<string[]> {
    return this.http
      .get<string[]>('https://localhost:7055/api/Animal/GetAll?name=' + this.searchQuery)
      .pipe(tap((result: string[]) => {
        this.animal = result;
      }));
  }
  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      this.username = username;
    });
    this.authService.loadUsername(); // Load tên người dùng từ localStorage khi khởi động
  }

  logout() {
    this.authService.clearUsername(); // Xóa tên người dùng khỏi AuthService và localStorage khi đăng xuất
  }
}
