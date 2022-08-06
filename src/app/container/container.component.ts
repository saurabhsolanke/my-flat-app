import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  loggedinUser : string | null | undefined;
  
  email: string = "";
  isUserLoggedIn: boolean | undefined;

  constructor(private authservice: AuthService,private toastr: ToastrService, private clockService: AuthService) { }

  ngOnInit() {
    this.loggedinUser=localStorage.getItem('email');
    console.log("Logged in User is :-"+this.loggedinUser)
    // this.loggedinUser = localStorage.getItem('email');
    // console.log(localStorage.getItem('loggedinUser'));
  }

  saveData(){
    sessionStorage.setItem('email','eve.holt@reqres.in');
    console.log("set item")
  }

  getData(){
    return sessionStorage.getItem('email');
  }

  loggedin(){
  this.loggedinUser = localStorage.getItem('email');
  return this.loggedinUser;
  }

  onLogout(){
    this.toastr.error('See yaa Later!' + this.email, 'Logged out');
    sessionStorage.clear();
    this.authservice.logout();
  }

  
}
