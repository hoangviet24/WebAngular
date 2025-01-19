import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-picture',
  imports: [CommonModule],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})
export class PictureComponent {
  selectedFile: File | null = null;
  files: string[] = [];
  imageSrc: string | null = null;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  // Load all files
  loadFiles(): void {
    this.fileService.getFile().subscribe(
      (data: string[]) => {
        this.files = data;
      },
      error => {
        console.error('Error loading files:', error);
      },
    );
  }

  // Handle file selection
   onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          alert('File uploaded successfully!');
          this.selectedFile = null;
          this.loadFiles();
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          alert('Failed to upload file.');
        },
      });
    }
  }
  

  // View file
  viewFile(fileName: string): void {
    this.imageSrc = this.fileService.getdetailFile(fileName);
  }
   // Thêm tính năng xóa file
   deleteFile(fileName: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this file?');
    if (confirmDelete) {
      this.fileService.deleteFile(fileName).subscribe({
        next: (response) => {
          alert('File deleted successfully!');
          this.loadFiles()// Cập nhật danh sách file sau khi xóa
        },
        error: (error) => {
          console.error('Error deleting file:', error);
          alert('Failed to delete file.');
          this.loadFiles();
        },
      });
    }
  }
  closePreview(): void {
    this.imageSrc = null;
  }
}
