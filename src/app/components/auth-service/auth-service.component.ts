import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-auth-service',
  imports: [],
  templateUrl: './auth-service.component.html',
  styleUrl: './auth-service.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class AuthServiceComponent {
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
      localStorage.setItem('username', username);
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    }
  }

  clearUsername() {
    this.usernameSubject.next(null);
    this.isAdminSubject.next(false);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
  }

  loadUsername() {
    let username = sessionStorage.getItem('username');
    let isAdmin = JSON.parse(sessionStorage.getItem('isAdmin') || 'false');
    if (!username) {
      username = localStorage.getItem('username');
      isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
    }
    if (username) {
      this.usernameSubject.next(username);
      this.isAdminSubject.next(isAdmin);
    }
  }
}