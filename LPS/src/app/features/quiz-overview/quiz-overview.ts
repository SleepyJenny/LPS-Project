import { Component } from '@angular/core';
import { ModusManager } from '../../core/services/modus-manager';

@Component({
  selector: 'app-quiz-overview',
  imports: [],
  templateUrl: './quiz-overview.html',
  styleUrl: './quiz-overview.css',
})
export class QuizOverview {

  
  constructor(private modusManager: ModusManager) {

  }

}
