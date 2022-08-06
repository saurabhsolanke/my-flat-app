import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Toast, ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  private userurl = "http://localhost:8000/user";
  id: string = "";
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  avatar: string = "";
  submitted = false;
  form !: FormGroup;


  constructor(private http: HttpClient, private toastr: ToastrService,  private service: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      // title: new FormControl('', [Validators.required]),
      // body: new FormControl('', Validators.required),
      // id: new FormControl("", [Validators.required, Validators.required]),
      first_name: new FormControl("", [Validators.required, Validators.required]),
      last_name: new FormControl("", [Validators.required, Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      avatar: new FormControl("", [Validators.required, Validators.required])

    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.service.addUser(this.form.value).subscribe((res:any) => {
         console.log('user created successfully!');
         this.toastr.success('new user', 'Added!');
           this.router.navigateByUrl('/user');
    })
  }

  // addUser(userData: User) {
  //   console.log(userData);
  //   return this.http.post(this.userurl, userData)
  //     .subscribe(
  //       response => {
  //         this.submitted = true;
  //         this.toastr.success('new user', 'Added!');
  //       },
  //     )
  // }

}
