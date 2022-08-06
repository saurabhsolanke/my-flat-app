import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  users: any;
  user!: User;
  submitted = false;
  formData !: FormGroup;
  userForm!: FormGroup;
  uid: any;

  private userurl = "http://localhost:3000/user";

  alert: boolean = false;
  // editUser2 = new FormGroup({
  // })

  constructor(private http: HttpClient, private router: ActivatedRoute, private service: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['userid'];
    this.service.find(this.id).subscribe((data: User) => {
      this.user = data;
    });

    this.userForm = new FormGroup({
      id: new FormControl(this.id, [Validators.required, Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [ Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),

    });
  }

  get f() {
    return this.userForm.controls;
  }

  updateuser1(id: any, first_name: any, last_name: any, email: any) {
    console.log(id);
    (<HTMLInputElement>document.getElementById("first_name")).value = first_name;
    (<HTMLInputElement>document.getElementById("last_name")).value = last_name;
    (<HTMLInputElement>document.getElementById("email")).value = email;
  }


  // updateuser(value: any) {
  //   let body = {
  //     first_name: value.first_name,
  //     email: value.email
  //   }

  //   this.service.updateuser(this.users, `622ca8c59f6c668226f74f52`)
  //     .subscribe((response: any) => {
  //       console.log(response)
  //     })

  //   // this.users.updateusers(this.router.snapshot.params['id'], this.editUser1.value).subscribe((result: any) =>
  //   //   console.log(result, "data updated successfully")
  //   // )
  // }

// usable ////////////////////////////////////////

  editUser1(uid: any, userData: User) {
    // this.no = 15;

    console.log(this.userForm.value);
    this.service.updateuser(this.uid.value, this.userForm.value).subscribe((res:any) => {
         console.log('Post updated successfully!');
        //  this.router.navigate('post/index');
    })
    console.log(userData);
    return this.http.put(`${this.userurl}/${uid}`, userData)
      .subscribe(
        (res: any) => {
          this.submitted = true;
          this.toastr.success('Existing user', 'Updated');
        },
      )
  }

 

  // editUser1() {
  //   console.log(this.userForm.value);
  //   this.service.updateuser(this.id, this.userForm.value).subscribe((res:any) => {
  //        console.log('Post updated successfully!');
  //        this.router.navigateByUrl('post/index');
  //   })
  // }
}
