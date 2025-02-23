import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DongvatComponent } from './components/dongvat/dongvat.component';
import { PictureComponent } from './components/picture/picture.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/User/login/login.component';
import { RegisterComponent } from './components/User/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { ManageComponent } from './components/manage/manage.component';
import { DetailComponent } from './components/detail/detail.component';
export const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path:'main',component: MainComponent, title:'Trang chủ'},
    {path: 'dongvat', component: DongvatComponent,title: 'Động vật'},
    {path:'picture',component : PictureComponent,title:'Ảnh'},
    {path: 'login',component: LoginComponent, title: 'Đăng nhập'},
    {path: 'register',component:RegisterComponent, title: 'Đăng ký'},
    {path: 'contact',component: ContactComponent, title:'Liên hệ'},
    {path:'manage',component:ManageComponent,title:'Quản lý'},
    {path:'detail/:id',component:DetailComponent,title:'Thông tin động vật'}
];