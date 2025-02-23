import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FileService } from '../../../services/file.service';
import {Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../User';
import { spawn } from 'child_process';
@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
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
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

    if(this.password.length <= 3 || !this.password.match(passwordPattern) ){
      alert('Mật khẩu phải có 6 ký tự trở lên và phải có ký tự đặc biệt');
      return;
    } 
    if (!this.email || !this.password) {
      alert('Email và mật khẩu không được để trống');
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(this.email)) {
      alert("Email không đúng cấu trúc");
      return;
    }
    const user = new User(this.email, this.password, false);
    this.fileService.register(user).subscribe(
      response => {
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 409) {
          alert('Tài khoản đã tồn tại');
        } else {
          // Các lỗi khác
          alert('Đã có lỗi xảy ra. Vui lòng thử lại');
        }
      }
    );
  }
}
