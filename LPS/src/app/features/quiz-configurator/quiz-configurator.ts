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
  this.modusManager.setMode('learn');
}
setFullExamMode() {
  this.modusManager.setMode('full-exam');
}
setPartialExamMode() {
  this.modusManager.setMode('partial-exam');
}
setSingleChoiceMode() {
  this.modusManager.setMode('single-choice');
}
}
