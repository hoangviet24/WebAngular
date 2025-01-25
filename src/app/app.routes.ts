import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DongvatComponent } from './components/dongvat/dongvat.component';
import { TaoDongVatComponent } from './components/tao-dong-vat/tao-dong-vat.component';
import { PictureComponent } from './components/picture/picture.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/User/login/login.component';
import { RegisterComponent } from './components/User/register/register.component';
export const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path:'main',component: MainComponent, title:'Trang chủ'},
    {path: 'dongvat', component: DongvatComponent,title: 'Động vật'},
    {path:'taodv',component: TaoDongVatComponent,title:'Tạo động vật'},
    {path:'picture',component : PictureComponent,title:'Ảnh'},
    {path: 'login',component: LoginComponent, title: 'Đăng nhập'},
    {path: 'register',component:RegisterComponent, title: 'Đăng ký'}
];
