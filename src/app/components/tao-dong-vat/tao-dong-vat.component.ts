import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tao-dong-vat',
  imports: [FormsModule],
  templateUrl: './tao-dong-vat.component.html',
  styleUrl: './tao-dong-vat.component.css'
})
export class TaoDongVatComponent {
  constructor(private http: HttpClient,private router: Router){}
  aniObj : any ={
    "id": 0,
    "name":"",
    "description":"",
    "type":"",
    "img":""
  }

  postAni(){
    this.http.post("https://localhost:7055/api/Animal/Add",this.aniObj).subscribe((res:any) =>{
      debugger;
      if(res){
        alert("Tạo thành công");
        this.router.navigate(['/']);
      }
      else{
        alert("Tạo thất bại")
      }
    })
  }
}
