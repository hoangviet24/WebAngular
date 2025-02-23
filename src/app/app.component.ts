import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FileService } from './services/file.service';
import { AuthServicesService } from './services/auth-services.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CommonModule, FileService,AuthServicesService]
})
export class AppComponent {
  title = 'WeaAnimal';
}
