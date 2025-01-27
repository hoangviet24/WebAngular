import { Component, OnInit } from '@angular/core';
import { FileService } from '../../file.service';
import { Router } from '@angular/router';
import { AuthServiceComponent } from '../../auth-service/auth-service.component';
import { FormsModule } from '@angular/forms';
import { User } from '../../User';
import { environment } from '../../../../environment/environment';

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
    private authService: AuthServiceComponent
  ) {}

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
          alert('Login Successful');
          console.log('Login response:', response); // Debugging
          this.authService.setUsername(response.userName, response.role, this.rememberMe); // Lưu tên người dùng và vai trò vào AuthService
          this.router.navigate(['/']);
        } else {
          alert(`Login failed: ${response}`);
        }
      },
      error => {
        alert('Login failed: ' + JSON.stringify(error));
      }
    );
  }

  loginWithFacebook(): void {
    FB.login((response: any) => {
      if (response.status === 'connected') {
        console.log('Logged in:', response);
        this.getUserInfo();
      } else {
        console.error('Login failed:', response);
      }
    }, { scope: 'public_profile,email' }); // Yêu cầu quyền truy cập thông tin cơ bản và email
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
  ngOnInit(): void {
    // Khởi tạo Facebook SDK
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: environment.facebookAppId, // Sử dụng biến môi trường
        cookie: true,
        xfbml: true,
        version: 'v15.0' // Chọn version phù hợp (mới nhất)
      });
    };
  }
}