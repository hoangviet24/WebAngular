import { Component } from '@angular/core';
import { FileService } from '../../file.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthServiceComponent } from '../../auth-service/auth-service.component';
import { User } from '../../User';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor (private fileServices: FileService, private router: Router,private authService: AuthServiceComponent){}
  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password';
  passwordIconClass: string = 'fa-solid fa-eye-slash';

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
          this.authService.setUsername(response.userName, response.role); // Lưu tên người dùng và vai trò vào AuthService
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
}
