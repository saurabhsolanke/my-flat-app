import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   email: string = "";
   password: string = "";
   formData !: FormGroup;
   Auth: any;
   Token: any;
   login: any;
   user: any;
   submitted: boolean | undefined;
   loginError: string | undefined;

   constructor(private authService : AuthService, private router : Router, private toastr: ToastrService) { }

   ngOnInit() {
      this.formData = new FormGroup({
         email: new FormControl("",[Validators.required]),
         password: new FormControl("",[Validators.required, Validators.minLength(6)]),
      });
   }

   onClickSubmit(data:any) {
      this.submitted = true;
      this.login = this.formData.value;
      this.email = data.email;
      this.password = data.password;
      this.authService.login(this.email, this.password).subscribe((data) => {
         if (this.authService.isUserLoggedIn) {
            // const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
            this.router.navigate(['/user']);
          } else {
            this.loginError = 'Username or password is incorrect.';
          }
        },
      );
    }

   // onClickSubmit(data: any) {
   //    this.login = this.formData.value;
   //    this.email = data.email;
   //    this.password = data.password;
   //    this.authService.login(this.email, this.password)
   //       .subscribe( data => {
   //          this.user = this.user;
   //         if(data) this.router.navigate(['/user']); 
   
   //  });
   // }




//   saveData(){
//    sessionStorage.setItem('name','eve.holt@reqres.in');
//  }

   // handleResponse(data: any){
   //    this.Token.handle(data.access_token);
   //    this.Auth.changeAuthStatus(true);
   //    sessionStorage.setItem('loggedUser', data.email);
   //    this.router.navigateByUrl('/user');
   //  }
}