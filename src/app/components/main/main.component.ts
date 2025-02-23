import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { AuthServicesService } from '../../services/auth-services.service';
register();
@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule,RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
 
  username: string | null = null;
  isAdmin: boolean = false;
  searchQuery: string = '';
  constructor(private http: HttpClient, private router: Router,private authService: AuthServicesService) { };
  animal: any[] = [];
  animalLucky :any[] =[];
  aniObj: any = {
    id: 0,
    name: '',
    description: '',
    type: '',
    img: "",
  };
  page = 1;
  pageSize = 30;
  totalRecord: number = 0
  ViewDetail: boolean = false;
  showFullDescription: { [id: string]: boolean } = {};
  ngOnInit() {
   
    this.getAnimal(); // Lấy danh sách động vật khi component được khởi tạo
    this.getRandom();
    this.authService.username$.subscribe(username => {
      this.username = username;
      console.log('Username:', this.username); // Debugging
    });
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      console.log('Is Admin:', this.isAdmin); // Debugging
    });
    this.authService.loadUsername(); // Load tên người dùng từ localStorage khi khởi động
  }
  getAnimal() {
    this.http
      .get(`https://localhost:7055/api/Animal/GetAll?name=${this.searchQuery}&page=${this.page}&pageSize=${this.pageSize}`)
      .subscribe((result: any) => {
        this.animal = result;
      });
  }
  search() {
    if (this.searchQuery.trim()) {
        this.router.navigate(['/dongvat'], { queryParams: { name: this.searchQuery } });
    }
  }
  getRandom(){
    this.http.get(`https://localhost:7055/api/Animal/Random`).subscribe((res:any)=>{
      this.animalLucky = res
    })
  }
 
  isDescriptionLong(description: string): boolean {
    return description.length > 200;
  }

  // Phương thức chuyển đổi trạng thái hiển thị
  toggleDescription(id: string): void {
    this.showFullDescription[id] = !this.showFullDescription[id];
  }
  onDetail(data: any): void {
    this.aniObj = { ...data };
    this.ViewDetail = true;
  }
  close(): void {
    this.ViewDetail = false; // Ẩn form chỉnh sửa
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition > 1000) {
      // Hiển thị nút nếu cuộn xuống hơn 300px
      document.querySelector('.back-to-top')?.classList.add('show');
    } else {
      // Ẩn nút nếu không cuộn quá 300px
      document.querySelector('.back-to-top')?.classList.remove('show');
    }
  }

  // Hàm cuộn lên đầu trang khi nhấn nút
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Cuộn mượt mà
    });
  }
}
