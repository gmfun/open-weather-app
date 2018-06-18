import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailComponent } from "./detail/detail.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'forecast/:id',      component: DetailComponent }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes
      )
      // other imports here
    ],
    exports: [RouterModule]
  })
  export class AppRouterModule { }