import { Component, signal ,} from '@angular/core';
import { QuestionsService } from '../../core/services/questions-service';
import { QuestionsInterface } from '../../core/questions-interface';
import { ModusManager } from '../../core/services/modus-manager';
import { QuizMode } from '../../core/quiz-mode.type';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { QuizContent } from '../quiz-content/quiz-content';
import { StudyContent } from '../study-content/study-content';

// Used to handle which content will be displayed here

@Component({
  selector: 'app-quiz-display',
  imports: [CommonModule, QuizContent, StudyContent],
  templateUrl: './quiz-display.html',
  styleUrl: './quiz-display.css',
})
export class QuizDisplay {

  quizMode$!: Observable<QuizMode>;

  // Inject the service into the constructor
  constructor(private modusManager: ModusManager) {
    this.quizMode$ = this.modusManager.quizMode$; // Subscribe to the quiz mode observable from the ModusManager service to react to changes in the quiz mode
  }

  // Use the ngOnInit lifecycle hook to fetch questions when the component initializes to make sure the service is ready before we try to access it

}
