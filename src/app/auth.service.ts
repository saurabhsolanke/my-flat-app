import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Observable, of } from 'rxjs';
import { tap, delay, map, mergeMap } from 'rxjs/operators';
import { UserComponent } from './container/user/user.component';
import { User } from './models/user.model';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   isUserLoggedIn: boolean = false;
   email: string = "";
   private userurl1 = "http://localhost:3000";
   // private loginurl = "http://localhost:3000/login";
   loggedinUser: string | null | undefined;
   isAuthenticated = false;
   logedInUserFirstName:string='';
   httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
      })
   }
   constructor(private toastr: ToastrService, private router: Router, private http: HttpClient) { }

   getClock() : Observable<Date> {
      return interval(1000).pipe(
        mergeMap(() => of(new Date()))
      )
   }

   getToken() {
      return localStorage.getItem('token');
   }

   // login(email: string, password: string) : Observable<any>  {
   //    console.log("Email:-  " + email, "| Pass:-  " + password);
   //    console.log(this.loggedinUser = localStorage.getItem('token'));
   //    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
   //    return this.http.post<any>(`${this.userurl1}/login`, { email: email, password: password })


   // .pipe(map((user: { token: any; }) => {
   //       if (user && user.token) {
   //          localStorage.setItem('currentUser', JSON.stringify(user));
   //       }
   //    }),
   // );
   //}

   // login(data: UserForLogin) {
   //    return this.http.post('https://reqres.in/api/login', data);
   //  }

   login(email: string, password: string): Observable<any> {
      console.log("Email:-  " + email, "| Pass:-  " + password);
      this.isUserLoggedIn =
         (email == 'djnbk' && password == 'c-1101' ||
            email == 'iamrohit' && password == 'c-1101' ||
            email == 'swapzz' && password == 'c-1101' ||
            email == 'hrrohit' && password == 'c-1101' ||
            email == 'krish' && password == 'c-1101' ||
            email == 'beatsmaniac' && password == 'c-1101' ||
            email == 'guest1' && password == 'c-1101' ||
            email == 'guest2' && password == 'c-1101' ||
            email == 'guest3' && password == 'c-1101'
            );

      console.log(this.loggedinUser = localStorage.getItem('token'));
      localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
      // localStorage.setItem('role',res['role'])

      return of(this.isUserLoggedIn).pipe(
         delay(50),
         tap(val => {
            console.log("User Authentication Status : " + val);
            if (val == true) {
               this.toastr.success('Hi, ' + email, 'Welcome');
               localStorage.setItem('email',email);
               this.loggedinUser = localStorage.getItem('email');
            }
            else {
               this.toastr.error('Email or Password', 'Wrong');
            }
         })
      );
   }

   logout() {
      this.isUserLoggedIn = false;
      this.router.navigate(['']);
      console.log("User Logged out!")
      localStorage.removeItem('token');
   }

   // update(id: number, post: any): Observable<Post> {
   //    return this.httpClient.put<Post>(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
   //    )
   //  }

   addUser(userData: any): Observable<User> {
      return this.http.post<User>(this.userurl1 + '/user/', JSON.stringify(userData), this.httpOptions)
   }

   updateuser(uid: string, userData: any): Observable<User> {
      // return this.http.patch(`${this.userurl1}/${uid}`, userData);
      return this.http.put<User>(this.userurl1 + '/edit/' + uid, JSON.stringify(userData), this.httpOptions)
   }

   find(uid: number): Observable<User> {
      console.log(uid, this.email);
      return this.http.get<User>(this.userurl1 + '/user/' + uid)
   }

   sendMessage(message:any){
      return this.http.post(this.userurl1 + '/chatMessages',message);
   }

}