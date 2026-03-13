import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { QuizMode } from '../../core/quiz-mode.type';
import { QuestionsInterface } from '../../core/questions-interface';
import { QuestionsService } from '../../core/services/questions-service';
import { ModusManager } from '../../core/services/modus-manager';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { CommonModule } from '@angular/common';


// This Component will display the exam content
// component designed to be modular and reusable


@Component({
  selector: 'app-quiz-content',
  imports: [CommonModule],
  templateUrl: './quiz-content.html',
  styleUrl: './quiz-content.css',
})
export class QuizContent {

  // Initializing Observables to avoid errors
  quizMode$!: Observable<QuizMode>;
  quizRunning$!: Observable<boolean>;
  currentQuestion$!: Observable<number>;
  wrongAnswersCount$!: Observable<number>;

  // Signal to hold all the questions for the selected quiz mode
  allQuestions = signal<QuestionsInterface[]>([]);

  selectedAnswer: string | null = null;

  
  // Inject the service into the constructor
  constructor(private questionsService: QuestionsService, private modusManager: ModusManager) {
  // Initialize Observables from ModusManager to track quiz mode, running state, and current question index
  this.quizMode$ = this.modusManager.quizMode$; 
  this.quizRunning$ = this.modusManager.quizRunning$;
  this.currentQuestion$ = this.modusManager.currentQuestion$;
  this.wrongAnswersCount$ = this.modusManager.wrongAnswersCount$;

  }

  ngOnInit() {
  // We have to subscribe to the quizMode$ first to get the selected mode and then load the corresponding questions
  // We get all Questions because we are in Exam Mode
   this.modusManager.quizMode$.pipe(
    switchMap(mode => this.questionsService.getQuestionsByMode(mode))
  ).subscribe(q => this.allQuestions.set(q));
  }

  // Quiz control methods
  userStartQuiz() {
    this.modusManager.startQuiz(); // Set quiz running state to true when the quiz starts
  }
  
  nextQuestion() {

    // we tell modusManager to check if the selected answer is correct and to track wrong answers
    this.modusManager.trackUserAnswers(this.selectedAnswer);

    this.modusManager.nextQuestion();
    this.selectedAnswer = null; // Reset selected answer when moving to the next question
  }

  previousQuestion() {
    this.modusManager.previousQuestion();
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }
}
