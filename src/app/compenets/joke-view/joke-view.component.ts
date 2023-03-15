import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatgptCallService } from 'src/app/services/chatgpt-call.service';


@Component({
  selector: 'app-joke-view',
  templateUrl: './joke-view.component.html',
  styleUrls: ['./joke-view.component.css']
})
export class JokeViewComponent {


  toggleButton: boolean = false;

  topic: string = "Birds";
  JokeObservable: Observable<string>;
  PunchlineObservable: Observable<string>;

  constructor(private chatgptCallService: ChatgptCallService) { 
    this.JokeObservable = this.chatgptCallService.JokeObservable;
    this.PunchlineObservable = this.chatgptCallService.PunchLineObservable;

    this.PunchlineObservable.subscribe(() => { this.toggleButton = false });
  }

  generateJoke(){
    
    this.toggleButton = true;
    this.chatgptCallService.CallAI(this.topic);
  }


}
