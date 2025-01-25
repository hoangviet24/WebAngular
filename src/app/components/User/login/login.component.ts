import { Component } from '@angular/core';
import { FileService } from '../../file.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthServiceComponent } from '../../auth-service/auth-service.component';

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
    this.fileServices.login(this.email, this.password).subscribe(
      response => {
        if (response) { // Kiểm tra nếu có phản hồi từ API
          alert('Login Successful');
          this.authService.setUsername(this.email); // Lưu tên người dùng vào AuthService
          this.router.navigate(['/']);
        } else {
          alert('Login failed: Invalid credentials');
        }
      },
      error => {
        alert('Login failed: ' + JSON.stringify(error));
      }
    );
  }
}
