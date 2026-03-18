import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { QuizMode } from '../../core/quiz-mode.type';
import { QuestionsInterface } from '../../core/questions-interface';
import { QuestionsService } from '../../core/services/questions-service';
import { ModusManager } from '../../core/services/modus-manager';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { CommonModule } from '@angular/common';
import { QuizOverview } from '../quiz-overview/quiz-overview';


// This Component will display the exam content
// component designed to be modular and reusable


@Component({
  selector: 'app-quiz-content',
  imports: [CommonModule, QuizOverview],
  templateUrl: './quiz-content.html',
  styleUrl: './quiz-content.css',
})
export class QuizContent {

  // Initializing Observables to avoid errors
  quizMode$!: Observable<QuizMode>;
  quizRunning$!: Observable<boolean>;
  currentQuestion$!: Observable<number>;
  wrongAnswersCount$!: Observable<number>;
  quizFinished$!: Observable<boolean>;
  

  // Signal to hold all the questions for the selected quiz mode
  allQuestions = signal<QuestionsInterface[]>([]);

  // Must be an Array, or else I can only select one answer
  selectedAnswers: string[] = [];

  
  // Inject the service into the constructor
  constructor(private questionsService: QuestionsService, private modusManager: ModusManager) {
  // Initialize Observables from ModusManager to track quiz mode, running state, and current question index
  this.quizMode$ = this.modusManager.quizMode$;
  this.quizRunning$ = this.modusManager.quizRunning$;
  this.currentQuestion$ = this.modusManager.currentQuestion$;
  this.wrongAnswersCount$ = this.modusManager.wrongAnswersCount$;
  this.quizFinished$ = this.modusManager.quizFinished$;

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
    // Gets called when the user presses the start Button in the beginning of the exam.
    this.modusManager.startQuiz();
  }
  userFinishQuiz() {
    // Save last answer before exam ends
    this.modusManager.trackUserAnswers(this.selectedAnswers);
    this.modusManager.finishQuiz();
  }
  handleNextOrFinish() {
  const isLastQuestion = this.modusManager.getCurrentIndex() === this.allQuestions().length - 1;

  if (isLastQuestion) {
    this.userFinishQuiz();
  } else {
    this.nextQuestion();
  }
  }
  
  nextQuestion() {

    // call modusManager to track answers
    this.modusManager.trackUserAnswers(this.selectedAnswers);

    this.modusManager.nextQuestion();

    this.updateSelectedAnswers();
  }
  previousQuestion() {

    // trackUserAnswers in case the user made a change
    this.modusManager.trackUserAnswers(this.selectedAnswers);

    this.modusManager.previousQuestion();
  
    // load answer from previous question
    this.updateSelectedAnswers();
  }

  selectAnswer(answer: string) {

  const index = this.selectedAnswers.indexOf(answer);

    if (index > -1) {
      // if already selcted, remove answer
      this.selectedAnswers.splice(index, 1);
    } else {
      // add answer to array
      this.selectedAnswers.push(answer);
    }
  }
  updateSelectedAnswers() {

    // Get Index so we can use it to find the question
    const currentIdx = this.modusManager.getCurrentIndex();
    const question = this.allQuestions()[currentIdx];
    // If we found a question, apply user Answer
    if (question) {
      this.selectedAnswers = this.modusManager.getUserAnswer(question.id)
    } else {
      this.selectedAnswers = [];
    }
  }

  // To easier Display in HTML
  isAnswerSelected(opt: string): boolean {
  return this.selectedAnswers.includes(opt);
  }
  onFillInInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedAnswers = [input.value]
  }
}
