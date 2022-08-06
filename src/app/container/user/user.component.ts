import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  email: string = "";
  isUserLoggedIn: User | undefined;
  first_name: any;
  users: any;
  user!: User[];
  p: number = 1;
  uid = ! null;
  submitted = false;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  d = new Date();
  dayName:string='';
  date: Date | undefined;

  clock: Observable<Date> | undefined;

  private userurl = "http://localhost:3000";

  dailytask:any[]=[];
  dailyexpense:any[]=[];
  monthlyrent:any[]=[];


  constructor(private AuthService: AuthService, private clockService: AuthService, private http: HttpClient, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.dayName = this.days[this.d.getDay()];
    // this.getallUsers();
    this.clock = this.clockService.getClock();
    this.dailyTasks();
    this.dailyExpense();
    this.monthlyRent();
  }

  dailyTasks(){
    let resp: any = this.http.get(this.userurl+'/daily-tasks');
    resp.subscribe((data: any) => this.dailytask = data);
    resp.subscribe((data: any) => console.log(data))
  }

  dailyExpense(){
    let resp: any = this.http.get(this.userurl+'/dets');
    resp.subscribe((data: any) => this.dailyexpense = data);
    resp.subscribe((data: any) => console.log(data))
  }

  monthlyRent(){
    let resp: any = this.http.get(this.userurl+'/montlyrent');
    resp.subscribe((data: any) => this.monthlyrent = data);
    resp.subscribe((data: any) => console.log(data))
  }
  
  Search() {
    if (this.first_name == "") {
      this.ngOnInit();
    }
    else {
      this.users = this.users.filter((res: { first_name: string; }) => {
        return res.first_name.toLocaleLowerCase().match(this.first_name.toLocaleLowerCase());
      })
    }
  }
  key: string = 'id';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getallUsers() {
    let resp: any = this.http.get(this.userurl+'/users');
    resp.subscribe((data: any) => this.users = data);
    resp.subscribe((data: any) => console.log(data))
    // resp.subscribe((data: any) => this.users = data['data']);
    // resp.subscribe((data: any) => console.log(data))
  }

  deleteUser(id: User, first_name: User, last_name: User, email: User) {
    console.log(id, email, first_name, last_name)
    return this.http.delete(`${this.userurl}/${id}`)
      .subscribe(
        response => {
          this.submitted = true;
          console.log("deleted");
          this.getallUsers();
          this.toastr.error('User ' + id + first_name + last_name, ' Deleted');
        },
      )
  }
}