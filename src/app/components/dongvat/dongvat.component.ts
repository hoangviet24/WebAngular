import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component ,HostListener,OnInit,ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-dongvat',
  imports: [FormsModule,CommonModule,RouterLink ],
  templateUrl: './dongvat.component.html',
  styleUrls: ['./dongvat.component.css'],
})
export class DongvatComponent implements OnInit {
  searchQuery: string = '';
  constructor(private http: HttpClient,private route: ActivatedRoute){
    this.searchSubject.pipe(
      debounceTime(500)  // Đợi 500ms sau khi người dùng gõ xong mới gọi API
    ).subscribe(query => this.getAnimal(query));
  };
  animal : any [] =[];
  aniObj: any = {
    id: 0,
    name: '',
    description: '',
    type: '',
    img:"",
  };
  page = 1;
  pageSize = 30;
  totalRecord : number = 0
  ViewDetail:boolean = false;
  showFullDescription: { [id: string]: boolean } = {};
  private searchSubject: Subject<string> = new Subject();
  ngOnInit() {
    this.getAnimal(); // Lấy danh sách động vật khi component được khởi tạo
    this.getTotal();
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['name'] || '';
      this.getAnimal();
  });
  }
  onSearch() {
    this.searchSubject.next(this.searchQuery);
  }
  getValue(){
    return  Math.ceil(this.totalRecord/this.pageSize)
  }
  getPageNumber() {
    const totalPages = this.getValue();
    const visiblePages = 5; // Số trang hiển thị (có thể tùy chỉnh)
    const page = this.page;
  
    let pages: any[] = [];
  
    if (totalPages <= visiblePages) {
      // Nếu tổng số trang ít hơn số trang cần hiển thị, hiển thị hết
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Luôn hiển thị trang đầu tiên
      pages.push(1);
  
      // Nếu trang hiện tại > 3, thêm dấu "..."
      if (page > 3) {
        pages.push("...");
      }
  
      // Thêm các trang xung quanh trang hiện tại
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      // Nếu trang hiện tại < totalPages - 2, thêm dấu "..."
      if (page < totalPages - 2) {
        pages.push("...");
      }
  
      // Luôn hiển thị trang cuối cùng
      pages.push(totalPages);
    }
  
    return pages;
  }
  onPageChange(pageNo: number){
    this.page = pageNo;
    this.getAnimal()
  }
  getTotal(){
    this.http.get('https://localhost:7055/api/Animal/GetTotal').subscribe((Res:any)=>{
      this.totalRecord = Res
    })
  }
  getAnimal(query?: string) {
    this.http
      .get(`https://localhost:7055/api/Animal/GetAll?name=${this.searchQuery}&page=${this.page}&pageSize=${this.pageSize}`)
      .subscribe((result: any) => {
        this.animal = result;
      });
  }
  isDescriptionLong(description: string): boolean {
    return description.length > 200;
  }

  // Phương thức chuyển đổi trạng thái hiển thị
  toggleDescription(id: string): void {
    this.showFullDescription[id] = !this.showFullDescription[id];
  }
  onDetail(data:any):void{
    this.aniObj = {...data};
    this.ViewDetail = true;
  }
  close(): void {
    this.ViewDetail = false; // Ẩn form chỉnh sửa
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition > 30) {
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
