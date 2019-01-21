import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
      path: 'login',
      component: LoginFormComponent,
    },
    {
      path: 'register',
      component: RegisterFormComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
