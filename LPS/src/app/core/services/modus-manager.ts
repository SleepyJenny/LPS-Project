import { Injectable } from '@angular/core';
import { QuizMode } from '../quiz-mode.type';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})

export class ModusManager {

  constructor() { }

  private quizModeSubject = new BehaviorSubject<QuizMode>(null); // type of Observable that holds the current quiz mode, initialized with null
  quizMode$ = this.quizModeSubject.asObservable(); // Observable, because we want to subscribe to changes in the quiz mode from other components

  // updates quizModeSubject, notifies subscribers
  setMode(mode: QuizMode) {
    this.quizModeSubject.next(mode); 
  }
}
