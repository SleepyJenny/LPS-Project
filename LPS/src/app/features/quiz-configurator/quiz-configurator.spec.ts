import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizConfigurator } from './quiz-configurator';

describe('QuizConfigurator', () => {
  let component: QuizConfigurator;
  let fixture: ComponentFixture<QuizConfigurator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizConfigurator],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizConfigurator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
