import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusManager } from '../../core/services/modus-manager';
import { QuizMode } from '../../core/quiz-mode.type';
import { Observable } from 'rxjs/internal/Observable';
import { QuestionsService } from '../../core/services/questions-service';
import { QuestionsInterface } from '../../core/questions-interface';
import { switchMap } from 'rxjs/internal/operators/switchMap';

// Component will display the study content based on quizMode
// Component designed to be modular and reusable 

@Component({
  selector: 'app-study-content',
  imports: [CommonModule],
  templateUrl: './study-content.html',
  styleUrl: './study-content.css',
})
export class StudyContent implements OnInit {

  quizMode$!: Observable<QuizMode>;
  quizRunning$!: Observable<boolean>;
  currentQuestion$!: Observable<number>;

  // Signal to hold all the questions for the selected quiz mode
  allQuestions = signal<QuestionsInterface[]>([]);
  
  // Inject the service into the constructor
  constructor(private questionsService: QuestionsService, private modusManager: ModusManager) {
  this.quizMode$ = this.modusManager.quizMode$; 
  this.quizRunning$ = this.modusManager.quizRunning$;
  this.currentQuestion$ = this.modusManager.currentQuestion$;
  }

  ngOnInit() {
  // We have to subscribe to the quizMode$ first to get the selected mode and then load the corresponding questions
   this.modusManager.quizMode$.pipe(
    switchMap(mode => this.questionsService.getQuestionsByMode(mode))
  ).subscribe(q => this.allQuestions.set(q));
  }

  // Quiz control methods
  startQuiz() {
    this.modusManager.startQuiz(); // Set quiz running state to true when the quiz starts
  }
  nextQuestion() {
    this.modusManager.nextQuestion();
  }
  previousQuestion() {
    this.modusManager.previousQuestion();
  } 
}
