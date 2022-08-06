import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ContainerComponent } from './container/container.component';
import { AdduserComponent } from './container/user/adduser/adduser.component';
import { EditComponent } from './container/user/edit/edit.component';
import { FooterComponent } from './container/user/footer/footer.component';

import { UserComponent } from './container/user/user.component';
import { ViewComponent } from './container/user/view/view.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  // {path: '',component: LoginComponent, children: [ {path: 'login',canActivate: [ExpenseGuard]}]},
  // {path:'', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'container', component: ContainerComponent },
  { path: 'user', component: UserComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'table', component: TableComponent },
  { path: 'view/:id', component: ViewComponent },
  // canActivate: [ExpenseGuard] 
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }