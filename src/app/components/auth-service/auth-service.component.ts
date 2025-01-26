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
  setUsername(username: string, isAdmin: boolean) {
    console.log('Setting username:', username); // Debugging
    console.log('Setting isAdmin:', isAdmin); // Debugging
    this.usernameSubject.next(username);
    this.isAdminSubject.next(isAdmin);
    localStorage.setItem('username', username);
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }

  clearUsername() {
    this.usernameSubject.next(null);
    this.isAdminSubject.next(false);
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('username');
  }
  loadUsername() {
    const username = localStorage.getItem('username');
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
    console.log('Loaded username:', username); // Debugging
    console.log('Loaded isAdmin:', isAdmin); // Debugging
    if (username) {
      this.usernameSubject.next(username);
      this.isAdminSubject.next(isAdmin);
    }
  }
}

