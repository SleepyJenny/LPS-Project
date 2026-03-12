import { Injectable } from '@angular/core';
import { QuizMode } from '../quiz-mode.type';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { QuestionsInterface } from '../questions-interface';
import { QuestionsService } from './questions-service';

// Zuständig für den Quizverlauf, sowie die Regeln der einzelnen Modi

@Injectable({
  providedIn: 'root',
})

export class ModusManager {

  // Manages the QuizMode selected by User
  private quizModeSubject = new BehaviorSubject<QuizMode>(null);
  quizMode$ = this.quizModeSubject.asObservable();

  // Quiz running or not
  quizRunningSubject = new BehaviorSubject<boolean>(false); // Observable to track whether the quiz is currently running, initialized with false
  quizRunning$ = this.quizRunningSubject.asObservable(); // Observable to allow other components to react to changes in the quiz running state

  // current question
  private currentQuestionSubject = new BehaviorSubject<number>(0);
  currentQuestion$ = this.currentQuestionSubject.asObservable();

  private allQuestions: QuestionsInterface[] = [];

  constructor(private questionsService: QuestionsService) {
    // load questions on initialization
    this.questionsService.getAllQuestions().subscribe(q => this.allQuestions = q);
  }

  // Mode serlected by user
  setMode(mode: QuizMode) {
    this.quizModeSubject.next(mode);
    this.loadQuestionsForMode(mode);  
  }

  private loadQuestionsForMode(mode: QuizMode) {
    this.questionsService.getQuestionsByMode(mode).subscribe(questions => {
      this.allQuestions = questions;
      this.currentQuestionSubject.next(0);
    });
  }

  // Quiz control methods
  startQuiz() {
    this.quizRunningSubject.next(true);
    this.currentQuestionSubject.next(0); // Quiz beginnt immer bei Frage 0
  }

  stopQuiz() {
    this.quizRunningSubject.next(false);
  }

  nextQuestion() {
    const current = this.currentQuestionSubject.value;
    this.currentQuestionSubject.next(current + 1);
  }

  previousQuestion() {
    const current = this.currentQuestionSubject.value;
    if (current > 0) {
      this.currentQuestionSubject.next(current - 1);
    }
  }

  get currentQuestion(): QuestionsInterface | null {
    const index = this.currentQuestionSubject.value;
    return this.allQuestions[index] ?? null;
  }
}
