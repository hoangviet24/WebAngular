import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class AuthServicesService implements OnInit {
  ngOnInit(): void {
    this.initializeUser();
  }
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  username$ = this.usernameSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  setUsername(username: string, isAdmin: boolean, rememberMe: boolean = false) {
    this.usernameSubject.next(username);
    this.isAdminSubject.next(isAdmin);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('isAdmin', JSON.stringify(isAdmin));

    if (rememberMe) {
      document.cookie = `username=${username}; path=/; max-age=31536000`; // Lưu 1 năm
      document.cookie = `isAdmin=${isAdmin}; path=/; max-age=31536000`;
    }
  }

  initializeUser() {
    const savedUsername = localStorage.getItem('username');
    const savedIsAdmin = localStorage.getItem('isAdmin');

    if (savedUsername && savedIsAdmin) {
      this.usernameSubject.next(savedUsername);
      this.isAdminSubject.next(JSON.parse(savedIsAdmin));
      sessionStorage.setItem('username', savedUsername);
      sessionStorage.setItem('isAdmin', savedIsAdmin);
    }
  }

  clearUsername() {
    this.usernameSubject.next(null);
    this.isAdminSubject.next(false);
    
    // Xóa dữ liệu trong sessionStorage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isAdmin');
  
    // Xóa dữ liệu trong localStorage (nếu còn dùng)
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
  
    // Xóa Cookies bằng cách đặt thời gian hết hạn về quá khứ
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }
  
  loadUsername() {
    let username = sessionStorage.getItem('username');
    let isAdmin = JSON.parse(sessionStorage.getItem('isAdmin') || 'false');

    if (!username) {
      console.log('Trying to load from cookies...'); // Debugging
      username = this.getCookie('username');
      isAdmin = JSON.parse(this.getCookie('isAdmin') || 'false');
    }

    console.log('Loaded username:', username, 'isAdmin:', isAdmin); // Debugging

    if (username) {
      this.usernameSubject.next(username);
      this.isAdminSubject.next(isAdmin);
    }
  }

  // Hàm hỗ trợ đọc cookie
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

}
