import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FileService } from '../../file.service';
import {Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../User';
@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fileService: FileService,private router: Router){}
  passwordFieldType: string = 'password';
  passwordIconClass: string = 'fa-solid fa-eye-slash';
  confirmPasswordFieldType: string = 'password';
  confirmPasswordIconClass: string = 'fa-solid fa-eye-slash';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIconClass = 'fa-solid fa-eye';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIconClass = 'fa-solid fa-eye-slash';
    }
  }

  toggleConfirmPasswordVisibility() {
    if (this.confirmPasswordFieldType === 'password') {
      this.confirmPasswordFieldType = 'text';
      this.confirmPasswordIconClass = 'fa-solid fa-eye';
    } else {
      this.confirmPasswordFieldType = 'password';
      this.confirmPasswordIconClass = 'fa-solid fa-eye-slash';
    }
  }
  
  register() {
    if (this.password !== this.confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }
    if (!this.email || !this.password) {
      alert('Email và mật khẩu không được để trống');
      return;
    }
    const user = new User(this.email, this.password, false);
    this.fileService.register(user).subscribe(
      response => {
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      error => {
        alert('Registration Failed: ' + JSON.stringify(error));
      }
    );
  }
}
