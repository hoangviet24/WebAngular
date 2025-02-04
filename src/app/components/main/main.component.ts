import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-main',
  imports: [CommonModule,FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  searchQuery: string = '';
  constructor(private http: HttpClient){};
  animal : any [] =[];
  aniObj: any = {
    id: 0,
    name: '',
    description: '',
    type: '',
    img:"",
  };
  page = 1;
  pageSize = 3;
  totalRecord : number = 0
  ViewDetail:boolean = false;
  showFullDescription: { [id: string]: boolean } = {};
  ngOnInit() {
    this.getAnimal(); // Lấy danh sách động vật khi component được khởi tạo
    this.getTotal();
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
  getAnimal() {
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
}
