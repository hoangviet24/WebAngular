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
  username$ = this.usernameSubject.asObservable();

  setUsername(username: string) {
    this.usernameSubject.next(username);
    localStorage.setItem('username', username);
  }

  clearUsername() {
    this.usernameSubject.next(null);
    localStorage.removeItem('username');
  }

  loadUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      this.usernameSubject.next(username);
    }
  }
}

