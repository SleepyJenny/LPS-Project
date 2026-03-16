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

  // Tracking wrong answers
  private wrongAnswersCountSubject = new BehaviorSubject<number>(0);
  wrongAnswersCount$ = this.wrongAnswersCountSubject.asObservable();

  // user selected answers with question id
  private userAnswers = new Map<number, string[]>();

  private allQuestions: QuestionsInterface[] = [];

  constructor(private questionsService: QuestionsService) {
    // load questions on initialization
    this.questionsService.getAllQuestions().subscribe(q => this.allQuestions = q);
  }


  // Mode selected by user
  // Set in QuizConfigurator and used in StudyContent to load the corresponding questions
  setMode(mode: QuizMode) {
    this.quizModeSubject.next(mode);
    this.loadQuestionsForMode(mode);  
  }

  // Load questions based on selected quiz mode
  private loadQuestionsForMode(mode: QuizMode) {
    this.questionsService.getQuestionsByMode(mode).subscribe(questions => {
      this.allQuestions = questions;
      this.currentQuestionSubject.next(0);
    });
  }

  // Quiz control methods
  startQuiz() {

    // Reset before starting
    this.userAnswers = new Map<number, string[]>();
    this.wrongAnswersCountSubject.next(0);

    this.quizRunningSubject.next(true);
    this.currentQuestionSubject.next(0); // Quiz beginnt immer bei Frage 0
  }
  stopQuiz() {

    // We reset in both start and stop to avoid errors and unwanted behaviors.
    this.quizRunningSubject.next(false);
    this.wrongAnswersCountSubject.next(0); 
    this.userAnswers = new Map<number, string[]>(); 
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
  trackUserAnswers(answers: string[]) {

    // appends user Anser to Array
    // Check if correct and track wrong answers

    const id = this.allQuestions[this.currentQuestionSubject.value].id;
    this.userAnswers.set(id, answers);

    // Validation
    const question = this.allQuestions.find(q => q.id === id);
    if (!question) return;

    // Making sure it works with the JSON Structure
    const isCorrect = this.compareAnswers(answers, Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]);

    if (!isCorrect) {
    this.wrongAnswersCountSubject.next(this.wrongAnswersCountSubject.value + 1);

      if (this.quizModeSubject.value === 'full-exam' && this.wrongAnswersCountSubject.value >= 8) {
        this.stopQuiz();
      }
    }

    /*this.userAnswers.push(answers);
    // I still need to implement avoiding duplicates when user goes back and changes answer, but for now we just track every answer given by the user
    if (answers !== this.allQuestions[this.currentQuestionSubject.value].correctAnswer ) {
      this.wrongAnswersCountSubject.next(this.wrongAnswersCountSubject.value + 1);
      // if full-exam Mode is set, we call failQuiz Logic after 8 wrong answers
      if (this.quizModeSubject.value === 'full-exam' && this.wrongAnswersCountSubject.value >= 8) {
        // QUIZ ENDS
        this.stopQuiz();
      }
    }*/
  }

  // Helper Method to Compare User answers with Correct Answers
  private compareAnswers(user: string[], correct: string[]): boolean {
  if (user.length !== correct.length) return false;
  return user.every(ans => correct.includes(ans));
  }

  numberOfWrongAnswers(): number {
    // Return the number of wrong answers
    return this.wrongAnswersCountSubject.value; 
  }
}
