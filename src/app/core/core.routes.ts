import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserChangeComponent } from './user-change/user-change.component';


const pagesRoutes: Routes = [
 
    { path: 'user-change', component: UserChangeComponent ,data: { animation: 'user-change' } },
   
   
  ];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class MasterRouterModule {}