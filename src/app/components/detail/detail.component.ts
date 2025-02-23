import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FileService } from '../../services/file.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { FormsModule } from '@angular/forms';
register()
@Component({
  selector: 'app-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private animalService: FileService) { }
  animal: any
  aniObj: any = {
    id: 0,
    name: '',
    description: '',
    type: '',
    img: "",
  };
  showFullDescription: { [id: string]: boolean } = {};
  animalType: any[] = [];
  detailNumber: number | undefined
  ngOnInit(): void {
   
    const id = this.route.snapshot.paramMap.get('id'); // Lấy id từ URL
    if (id) {
      this.getAnimal(id);
    }
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getAnimal(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  ViewDetail: boolean = false;
  onDetail(data: any): void {
    this.aniObj = { ...data };
    this.ViewDetail = true;
  }
  close(): void {
    this.ViewDetail = false; // Ẩn form chỉnh sửa
  }
  isDescriptionLong(description: string): boolean {
    return description.length > 200;
  }

  // Phương thức chuyển đổi trạng thái hiển thị
  toggleDescription(id: string): void {
    this.showFullDescription[id] = !this.showFullDescription[id];
  }
  getTypeAnimal(type: string) {
    this.http.get(`https://localhost:7055/api/Animal/Type?type=${type}`)
      .subscribe((res: any) => {
        this.animalType = res;
      });
}

  getAnimal(id: string): void {
    this.animalService.getAnimal(id).subscribe({
      next: result => {
        this.animal = result;
        this.getTypeAnimal(result.type); // Gọi ngay sau khi có animal
      },
      error: err => console.error('Có lỗi xảy ra', err)
    });
  }

}
