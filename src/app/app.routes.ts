import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DongvatComponent } from './components/dongvat/dongvat.component';
import { TaoDongVatComponent } from './components/tao-dong-vat/tao-dong-vat.component';

export const routes: Routes = [
    {path: '', redirectTo: 'dongvat', pathMatch: 'full'},
    {path: 'dongvat', component: DongvatComponent,title: 'Động vật'},
    {path:'taodv',component: TaoDongVatComponent,title:'Tạo động vật'},
];
