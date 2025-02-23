import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../../services/auth-services.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../User';

declare let FB: any;

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  passwordFieldType: string = 'password';
  passwordIconClass: string = 'fa-solid fa-eye-slash';

  constructor(
    private fileServices: FileService,
    private router: Router,
    private authService: AuthServicesService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIconClass = 'fa-solid fa-eye';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIconClass = 'fa-solid fa-eye-slash';
    }
  }

  Login() {
    if (!this.email || !this.password) {
      alert('Email và mật khẩu không được để trống');
      return;
    }
    this.fileServices.login(this.email, this.password).subscribe(
      (response: User) => {
        if (response) { // Kiểm tra nếu có phản hồi từ API
          alert('Đăng nhập thành công');
          console.log('Login response:', response); // Debugging
          this.authService.setUsername(response.userName, response.role, this.rememberMe); // Lưu tên người dùng và vai trò vào AuthService
          this.router.navigate(['/']);
        } else {
          alert('Thông tin hoặc mật khẩu không chính xác');
        }
      },
      error => {
        alert('Login failed: ' + JSON.stringify(error));
      }
    );
  }

  getUserInfo(): void {
    FB.api('/me', { fields: 'id,name,email' }, (response: any) => {
      console.log('User Info:', response);
      // Lưu thông tin người dùng vào AuthService
      this.authService.setUsername(response.email, false, this.rememberMe);
      // Điều hướng đến trang chủ
      this.router.navigate(['/']);
    });
  }
}