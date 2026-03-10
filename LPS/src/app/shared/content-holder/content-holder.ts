import { Component } from '@angular/core';
import { QuizDisplay } from '../../features/quiz-display/quiz-display';

@Component({
  selector: 'app-content-holder',
  imports: [QuizDisplay],
  templateUrl: './content-holder.html',
  styleUrl: './content-holder.css',
})
export class ContentHolder {}
