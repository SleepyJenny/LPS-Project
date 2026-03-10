import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs'; // Import Observable for handling asynchronous data, needed for the return of HttpClient methods
import { QuestionsInterface } from '../questions-interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private jsonUrl = 'data/questions.json'; // URL to the JSON file containing questions

  test = "QuestionsService is ready to Mingle ;)"
  
  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<QuestionsInterface[]> {
    return this.http.get<QuestionsInterface[]>(this.jsonUrl);
  }
}
