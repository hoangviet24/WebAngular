import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component ,OnInit,ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-dongvat',
  imports: [FormsModule,CommonModule],
  templateUrl: './dongvat.component.html',
  styleUrls: ['./dongvat.component.css'],
})
export class DongvatComponent implements OnInit {
  constructor(private http: HttpClient) {}

  // Đối tượng để lưu thông tin động vật đang chỉnh sửa
  aniObj: any = {
    id: 0,
    name: '',
    description: '',
    type: '',
    img:""
  };
  showFullDescription: { [id: string]: boolean } = {}; // Lưu trạng thái mô tả mở rộng
  // Phương thức kiểm tra mô tả dài
  isDescriptionLong(description: string): boolean {
    return description.length > 200;
  }

  // Phương thức chuyển đổi trạng thái hiển thị
  toggleDescription(id: string): void {
    this.showFullDescription[id] = !this.showFullDescription[id];
  }
  // Danh sách động vật
  animal: any[] = [];
  // Dữ liệu tìm kiếm
  searchQuery: string = '';
  showEditForm = false;
  // Lấy danh sách động vật
  getAnimal() {
    this.http
      .get('https://localhost:7055/api/Animal/GetAll?name='+this.searchQuery)
      .subscribe((result: any) => {
        this.animal = result;
      });
  }
  getItems(): any[] {
    // Giả lập dữ liệu
    return Array.from({ length: 50 }, (_, i) => ({
      name: `Animal ${i + 1}`,
      description: `Description ${i + 1}`
    }));
  }
  // Hiển thị thông tin động vật để chỉnh sửa
  onEdit(data: any) : void {
    console.log("Edit Data: ", data);
    this.aniObj = { ...data }; // Sao chép toàn bộ dữ liệu từ đối tượng vào aniObj
    this.showEditForm = true; // Hiển thị form chỉnh sửa
    console.log("Show Edit Form: ", this.showEditForm);    
  }
  
  delAnimal(data:any) {
    if (confirm('Bạn có chắc chắn muốn xóa động vật này?')) {
      this.http.delete("https://localhost:7055/api/Animal/Delete?id=" + data.id)
        .subscribe(
          (response) => {
            alert('Đã xóa động vật thành công!');
            this.getAnimal(); // Cập nhật lại danh sách động vật
          },
          (error) => {
            alert('Có lỗi xảy ra khi xóa động vật!');
          }
        );
    }
  }
  
  // Lưu thay đổi khi người dùng sửa thông tin động vật
  saveChanges() {
    this.http
      .put(
        `https://localhost:7055/api/Animal/Update?id=${this.aniObj.id}`,
        this.aniObj
      )
      .subscribe(
        (response) => {
          alert('Cập nhật thành công!');
          this.getAnimal(); // Tải lại danh sách động vật
          this.aniObj = { id: 0, name: '', description: '', type: '' }; // Đặt lại form
          this.showEditForm = false; // Ẩn form chỉnh sửa
        },
        (error) => {
          alert('Có lỗi xảy ra khi cập nhật động vật!');
        }
      );
  }
  close(): void {
    this.showEditForm = false; // Ẩn form chỉnh sửa
  }
  // Hàm khởi tạo
  ngOnInit() {
    this.getAnimal(); // Lấy danh sách động vật khi component được khởi tạo
  }
}
