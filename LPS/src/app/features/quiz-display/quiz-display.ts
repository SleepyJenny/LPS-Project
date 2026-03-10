import { Component, signal , OnInit} from '@angular/core';
import { QuestionsService } from '../../core/services/questions-service';
import { QuestionsInterface } from '../../core/questions-interface';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-quiz-display',
  imports: [],
  templateUrl: './quiz-display.html',
  styleUrl: './quiz-display.css',
})
export class QuizDisplay implements OnInit {
  test = "This should be overridden by the service ;)"

  // Create a signal to hold the questions data (All Questions for now, but we can create more specific signals for different types of questions if needed)
  allQuestions = signal<QuestionsInterface[]>([]);

  // Inject the service into the constructor
  constructor(private questionsService: QuestionsService) {
    this.test = this.questionsService.test; // Access the service's property
  }

  // Use the ngOnInit lifecycle hook to fetch questions when the component initializes to make sure the service is ready before we try to access it
  ngOnInit(): void {
    this.questionsService.getAllQuestions().subscribe(questions => {
      this.allQuestions.set(questions); // Update the signal with the fetched questions
    });
  }
}
