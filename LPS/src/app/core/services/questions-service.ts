import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { map, Observable } from 'rxjs'; // Import Observable for handling asynchronous data, needed for the return of HttpClient methods
import { QuestionsInterface } from '../questions-interface';
import { QuizMode } from '../quiz-mode.type';

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
  
  // Method to get questions based on quiz mode
  getQuestionsByMode(mode: QuizMode): Observable<QuestionsInterface[]> {
  return this.getAllQuestions().pipe(
    map(questions => {
      switch (mode) {
        case 'single-choice':
          return questions.filter(q => q.type === 'single-choice');
        case 'multiple-choice':
          return questions.filter(q => q.type === 'multiple-choice');
        case 'fill-in':
          return questions.filter(q => q.type === 'fill-in');
        default:
          return questions; // z.B. für 'learn' oder 'full-exam'
        } 
      })
    );
  }
}
