import { Injectable } from '@angular/core';
import { QuizMode } from '../quiz-mode.type';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { take } from 'rxjs/operators';
import { QuestionsInterface } from '../questions-interface';
import { QuestionsService } from './questions-service';

// Keeps track of QuizMode, QuizState, UserAnswers
// Handles Answering Logic

@Injectable({
  providedIn: 'root',
})

export class ModusManager {

  // Manages the QuizMode selected by User
  private quizModeSubject = new BehaviorSubject<QuizMode | null>(null);
  quizMode$ = this.quizModeSubject.asObservable();

  // Quiz running or not
  // Tracks quiz running state
  quizRunningSubject = new BehaviorSubject<boolean>(false);
  quizRunning$ = this.quizRunningSubject.asObservable(); // Observable to allow other components to react to changes in the quiz running state

  // current question
  private currentQuestionSubject = new BehaviorSubject<number>(0);
  currentQuestion$ = this.currentQuestionSubject.asObservable();

  // Tracking wrong answers
  private wrongAnswersCountSubject = new BehaviorSubject<number>(0);
  wrongAnswersCount$ = this.wrongAnswersCountSubject.asObservable();

  // user selected answers with question id
  private userAnswers = new Map<number, string[]>();
  private failedQuestionsIds = new Set<number>();

  private allQuestions: QuestionsInterface[] = [];

  constructor(private questionsService: QuestionsService) {
    // load questions on initialization
    this.questionsService.getAllQuestions().pipe(take(1)).subscribe(q => this.allQuestions = q);
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
    this.failedQuestionsIds.clear();
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

    // We use currentQuestionSubject.Value to find the question in allQuestions()
    const currentIndex = this.currentQuestionSubject.value;
    const question = this.allQuestions[currentIndex];

    // Return if no question found or index out of bounds
    if (!question) return;
    if (currentIndex < 0 || currentIndex >= this.allQuestions.length) {
      return; // Prevent out-of-bounds access
    }

    // Save user answer
    this.userAnswers.set(question.id, answers);

    // Check user answer
    const correctOnes = Array.isArray(question.correctAnswer) 
    ? question.correctAnswer 
    : [question.correctAnswer];
  
    const isCorrect = this.compareAnswers(answers, correctOnes);

    // update set instead of counting up
    if (!isCorrect) {
    this.failedQuestionsIds.add(question.id);
    } else {
    // in case user changed from wrong to correct
    this.failedQuestionsIds.delete(question.id);
    }

    // Update wrongAnswerSubject with new count
    this.wrongAnswersCountSubject.next(this.failedQuestionsIds.size);

    // Quit Exam after 8 wrong Answers
    if (this.failedQuestionsIds.size >= 8 && this.quizModeSubject.value === 'full-exam') {
      this.stopQuiz();
    }
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
  // Get UserAnswer based on Id
  getUserAnswer(questionId: number): string[] {
    return this.userAnswers.get(questionId) || [];
  }
  // Returns Index of current question
  getCurrentIndex(): number {
    return this.currentQuestionSubject.value;
  }
}
