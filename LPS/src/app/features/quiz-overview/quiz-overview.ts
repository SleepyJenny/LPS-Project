import { Component } from '@angular/core';
import { ModusManager } from '../../core/services/modus-manager';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-overview',
  imports: [CommonModule],
  templateUrl: './quiz-overview.html',
  styleUrl: './quiz-overview.css',
})
export class QuizOverview {

  allQuestions: any[];
  answeredByUser =  new Map<number, string[]>();
  numberOfMistakes = 0;
  constructor(private modusManager: ModusManager) {
    this.allQuestions = this.modusManager.getQuestions();
    this.answeredByUser = this.modusManager.getQuestionsAnsweredByUser();
    this.numberOfMistakes = this.modusManager.numberOfWrongAnswers();
  }

  compareAnswers(user: string[] | undefined, correct: any): boolean {
  // use empty array if user didn't answer the question
  return this.modusManager.compareAnswers(user || [], correct);
}

}
