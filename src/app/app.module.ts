import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { User } from './models/user.model';
import { AdduserComponent } from './container/user/adduser/adduser.component';
import { ContainerComponent } from './container/container.component';
import { EditComponent } from './container/user/edit/edit.component';
import { FooterComponent } from './container/user/footer/footer.component';
import { TableComponent } from './table/table.component';

import { UserComponent } from './container/user/user.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from './auth.service';
import { ViewComponent } from './container/user/view/view.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    AdduserComponent,
    ContainerComponent,
    EditComponent,
    FooterComponent,
    TableComponent,
    ViewComponent,
    LeftnavComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
