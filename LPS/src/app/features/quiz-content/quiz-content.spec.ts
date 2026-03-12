import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizContent } from './quiz-content';

describe('QuizContent', () => {
  let component: QuizContent;
  let fixture: ComponentFixture<QuizContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizContent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
