import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { chatMessages } from './chat-messages';
import { AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentUser=localStorage.getItem('email')
  messages: any = [];  
  totalOnline = 0;
  user = 1;
  clock: Observable<Date> | undefined;
  d = new Date();
  time :string= this.d.getHours()+':'+this.d.getMinutes();
  private userurl = "http://localhost:3000";


  constructor(private AuthService: AuthService, private clockService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    if(this.d.getHours()>12){
      var hrs=(this.d.getHours()-12).toString();
      this.time=hrs+':'+this.d.getMinutes();
    }else{
      this.time=this.d.getHours()+':'+this.d.getMinutes();
    }
    console.log(this.clock)
    this.messages = chatMessages;
    this.getallmsgs();
    this.clock = this.clockService.getClock();
  }

  getallmsgs() {
    let resp: any = this.http.get(this.userurl+'/chatMessages');
    resp.subscribe((data: any) => this.messages = data);
    resp.subscribe((data: any) => console.log(data))
  }

  // sendMessage(message: any) {
  //   const nd = new Date;
  //   const data = {
  //     message,
  //     userId: this.user,
  //     time: nd.getHours() + ":" + nd.getMinutes()
  //   };
  //   this.messages = [...this.messages, data];
  // }

  sendMessage(messages: any) {
    var messageobj={
      'message':messages,
      'email': localStorage.getItem('email'),
      'time': this.time
    }
    this.AuthService.sendMessage(messageobj).subscribe((res)=>{
      console.log(res);
      this.getallmsgs();
    });
  }
}