import { Component } from '@angular/core';
import { QuizDisplay } from '../../features/quiz-display/quiz-display';
import { QuizConfigurator } from '../../features/quiz-configurator/quiz-configurator';


@Component({
  selector: 'app-content-holder',
  imports: [QuizDisplay, QuizConfigurator],
  templateUrl: './content-holder.html',
  styleUrl: './content-holder.css',
})
export class ContentHolder {}
