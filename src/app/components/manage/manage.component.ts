import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-manage',
  imports: [FormsModule, CommonModule, MatAutocompleteModule,
    MatInputModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  constructor(private http: HttpClient, private router: Router) { }
  showDropdown = false;
  isInvalidType = false;
  typeOptions: string[] = ['Ăn thịt', 'Ăn cỏ', 'Có vú'];
  filteredOptions: string[] = [];
  // Đối tượng để lưu thông tin động vật đang chỉnh sửa
  aniObj: any = {
    id: 0,
    name: '',
    description: '',
    type: '',
    img: ""
  };
  ViewDetail = false
  page = 1;
  pageSize = 30;
  totalRecord: number = 0
  showFullDescription: { [id: string]: boolean } = {}; // Lưu trạng thái mô tả mở rộng
  // Phương thức kiểm tra mô tả dài
  isDescriptionLong(description: string): boolean {
    return description.length > 200;
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

  // Phương thức chuyển đổi trạng thái hiển thị
  toggleDescription(id: string): void {
    this.showFullDescription[id] = !this.showFullDescription[id];
  }
  // Danh sách động vật
  animal: any[] = [];
  // Dữ liệu tìm kiếm
  searchQuery: string = '';
  showEditForm = false;
  showCreateForm = false;
  ngOnInit() {
    this.getAnimal(); // Lấy danh sách động vật khi component được khởi tạo
    this.getTotal();
  }
  // Lấy danh sách động vật
  getAnimal() {
    this.http
      .get(`https://localhost:7055/api/Animal/GetAll?name=${this.searchQuery}&page=${this.page}&pageSize=${this.pageSize}`)
      .subscribe((result: any) => {
        this.animal = result;
      });
  }
  onDetail(data: any): void {
    this.aniObj = { ...data };
    this.ViewDetail = true;
  }
  getTotal() {
    this.http.get('https://localhost:7055/api/Animal/GetTotal').subscribe((Res: any) => {
      this.totalRecord = Res
    })
  }
  getValue() {
    return Math.ceil(this.totalRecord / this.pageSize)
  }

  onPageChange(pageNo: number) {
    this.page = pageNo;
    this.getAnimal()
  }
  getItems(): any[] {
    // Giả lập dữ liệu
    return Array.from({ length: 50 }, (_, i) => ({
      name: `Animal ${i + 1}`,
      description: `Description ${i + 1}`
    }));
  }
  onCreate(): void {
    this.showCreateForm = true; // Hiển thị form tạo
    console.log("Show Edit Form: ", this.showCreateForm);
  }
  //Hàm tạo động vật
  removeDiacritics(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  filterOptions() {
    if (!this.aniObj.type) {
      this.filteredOptions = [];
      this.isInvalidType = true;
    } else {
      const inputNormalized = this.removeDiacritics(this.aniObj.type.toLowerCase());

      this.filteredOptions = this.typeOptions.filter(option =>
        this.removeDiacritics(option.toLowerCase()).includes(inputNormalized)
      );

      this.isInvalidType = !this.filteredOptions.includes(this.aniObj.type);
    }
    this.showDropdown = this.filteredOptions.length > 0;
  }


  selectOption(option: string) {
    this.aniObj.type = option;
    this.showDropdown = false;
    this.isInvalidType = false;
  }

  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  postAni() {
    this.isInvalidType = !this.typeOptions.includes(this.aniObj.type); // Kiểm tra nếu type không hợp lệ

    if (this.isInvalidType) {
      alert("Loài không hợp lệ!");
      return;
    }

    this.http.post("https://localhost:7055/api/Animal/Add", this.aniObj).subscribe((res: any) => {
      if (res) {
        alert("Tạo thành công");
        this.aniObj = { id: 0, name: '', description: '', type: '', img: '' };
        this.showCreateForm = false;
      } else {
        alert("Tạo thất bại");
      }
    });
  }
  // Hiển thị thông tin động vật để chỉnh sửa
  onEdit(data: any): void {
    console.log("Edit Data: ", data);
    this.aniObj = { ...data }; // Sao chép toàn bộ dữ liệu từ đối tượng vào aniObj
    this.showEditForm = true; // Hiển thị form chỉnh sửa
    console.log("Show Edit Form: ", this.showEditForm);
  }

  delAnimal(data: any) {
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
    this.showCreateForm = false;
    this.ViewDetail = false;
  }
}
