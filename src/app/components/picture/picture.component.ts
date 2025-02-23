import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
declare var bootstrap: any; 
@Component({
  selector: 'app-picture',
  imports: [CommonModule,FormsModule],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})

export class PictureComponent {
  
  selectedFile: File | null = null;
  allFiles: string[] = [];
  files: string[] = [];
  itemsPerPage = 30; // Số ảnh hiển thị mỗi lần
  currentIndex = 0; // Vị trí hiện tại
  imageSrc: string | null = null;
  username: string | null = null;
  isAdmin: boolean = false;
  fileName: string = '';  // Biến lưu tên ảnh do người dùng nhập
  constructor(public fileService: FileService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.isAdmin = params['isAdmin'] === 'true';

      // Lưu thông tin vào sessionStorage
      if (this.username) {
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
      }
    });

    // Kiểm tra và tải thông tin từ sessionStorage nếu cần
    if (!this.username) {
      this.username = sessionStorage.getItem('username');
      this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin') || 'false');
    }

    this.loadFiles();
  }
  getFileName(fileUrl: string): string {
    return fileUrl.split('=').pop() || 'Unknown';
  }
  
  // Load all files
  loadFiles(): void {
    this.fileService.getFile().subscribe(
      (data: string[]) => {
        // Lưu toàn bộ danh sách file vào allFiles
        this.allFiles = data.map(fileName => `${this.fileService.apiUrlImage}/view-file?fileName=${fileName}`);
        this.files = []; // Đảm bảo danh sách hiển thị ban đầu rỗng
        this.currentIndex = 0; // Reset vị trí
        this.loadMoreFiles(); // Load 30 ảnh đầu tiên
      },
      error => {
        console.error('Error loading files:', error);
      }
    );
  }
  //Tải thêm ảnh khi đạt số lượng trong một screen
  loadMoreFiles(): void {
    const nextIndex = this.currentIndex + this.itemsPerPage;
    this.files = [...this.files, ...this.allFiles.slice(this.currentIndex, nextIndex)]; // Thêm ảnh mới
    this.currentIndex = nextIndex;
  }
  
  hasMoreFiles(): boolean {
    return this.currentIndex < this.allFiles.length;
  }
  
  // Handle file selection
   onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  searchText: string = '';  // Biến lưu từ khóa tìm kiếm

  filterFiles(): void {
    const keywords = this.searchText.toLowerCase().split(',').map(k => k.trim()); // Tách từ khóa bằng dấu phẩy
  
    this.files = this.allFiles.filter(file => 
      keywords.some(keyword => file.toLowerCase().includes(keyword))
    );
  }
  uploadFile(): void {
    if (!this.selectedFile || this.fileName.trim() === '') {
      alert('Vui lòng chọn file và nhập tên ảnh.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile);
  
    // Gửi customFileName đúng key mà API đọc được
    formData.append('customFileName', this.fileName.trim());
  
    console.log('FormData gửi đi:', formData.get('customFileName'));
  
    this.fileService.uploadFile(formData)
    .pipe(take(1))
    .subscribe({
      next: () => {
        alert('Upload thành công!');
        this.selectedFile = null;
        this.fileName = '';
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
        this.loadFiles();
      },
      error: (error) => {
        console.error('Lỗi upload:', error);
        alert(error.error?.message || 'Lỗi khi upload file.');
      },
    });
  }
   // Thêm tính năng xóa file
   deleteFile(fileUrl: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this file?');
    if (confirmDelete) {
      // Tách fileName từ URL
      const fileName = fileUrl.split('fileName=')[1]; 
      
      this.fileService.deleteFile(fileName).subscribe({
        next: () => {
          alert('File deleted successfully!');
          this.loadFiles(); // Cập nhật danh sách file sau khi xóa
        },
        error: (error) => {
          console.error('Error deleting file:', error);
          alert('Failed to delete file.');
          this.loadFiles();
        },
      });
    }
  }
  selectedImage: string = '';

  viewFile(file: string) {
    this.selectedImage = file;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  }
  closePreview(): void {
    this.imageSrc = null;
  }
}
