import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [CommonModule,FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
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
  ViewDetail:boolean = false;
  showFullDescription: { [id: string]: boolean } = {};
  getAnimal() {
    this.http
      .get('https://localhost:7055/api/Animal/GetAll?name='+this.searchQuery)
      .subscribe((result: any) => {
        this.animal = result;
      });
  }
  ngOnInit() {
    this.getAnimal(); // Lấy danh sách động vật khi component được khởi tạo
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
