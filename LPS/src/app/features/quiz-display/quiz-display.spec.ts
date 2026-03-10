import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDisplay } from './quiz-display';

describe('QuizDisplay', () => {
  let component: QuizDisplay;
  let fixture: ComponentFixture<QuizDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
