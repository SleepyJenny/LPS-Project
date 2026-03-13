import { Component } from '@angular/core';
import { ModusManager } from '../../core/services/modus-manager';

@Component({
  selector: 'app-quiz-configurator',
  imports: [],
  templateUrl: './quiz-configurator.html',
  styleUrl: './quiz-configurator.css',
})
export class QuizConfigurator {

constructor(private modusManager: ModusManager) {}
  
setLernMode() {
  this.modusManager.stopQuiz(); // Making sute that the quiz starts with a blank state
  this.modusManager.setMode('learn');
}
setFullExamMode() {
  this.modusManager.stopQuiz();
  this.modusManager.setMode('full-exam');
}
setPartialExamMode() {
  this.modusManager.stopQuiz();
  this.modusManager.setMode('partial-exam');
}
setSingleChoiceMode() {
  this.modusManager.stopQuiz();
  this.modusManager.setMode('single-choice');
}
setMultipleChoiceMode() {
  this.modusManager.stopQuiz();
  this.modusManager.setMode('multiple-choice');
}
setFillInMode() {
  this.modusManager.stopQuiz();
  this.modusManager.setMode('fill-in');
}

}
