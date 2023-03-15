import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Joke } from '../interfaces/joke';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatgptCallService {

  private JokeSubject: Subject<string> = new BehaviorSubject<string>("");
  private PunchLineSubject: Subject<string> = new BehaviorSubject<string>("");

  JokeObservable: Observable<string> = this.JokeSubject.asObservable();
  PunchLineObservable: Observable<string> = this.PunchLineSubject.asObservable();

  constructor(private http: HttpClient) {


  }

  CallAI(topic: string) {
    const sleep = (ms: any) => new Promise(r => setTimeout(r, ms));

    console.log("calling ai");

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const apiKey = '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';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    });

    let requestBody = {model: 'gpt-3.5-turbo', messages: [{"role": "user", "content": "Make a joke about "+ topic +" and wrap it in json. Format: joke, punchline"}]};

    this.http.post<any>(apiUrl,requestBody, { headers: headers }).subscribe(async response => {
      let jokeResponse = JSON.parse(response.choices[0].message.content) as Joke;
      console.log(jokeResponse);
      this.JokeSubject.next(jokeResponse.joke);
      await sleep(3000);
      this.PunchLineSubject.next(jokeResponse.punchline);
    });
  }

}
