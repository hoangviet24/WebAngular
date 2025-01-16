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
  constructor(private http: HttpClient){}
  animal : any [] =[]
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
}
