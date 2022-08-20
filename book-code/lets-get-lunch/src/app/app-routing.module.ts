import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module')
      .then(m => m.SignupModule)
  },{
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
    },{
      path: 'login',
      loadChildren: () => import('./modules/login/login.module')
        .then(m => m.LoginModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
