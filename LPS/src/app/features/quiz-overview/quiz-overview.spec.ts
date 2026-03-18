import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOverview } from './quiz-overview';

describe('QuizOverview', () => {
  let component: QuizOverview;
  let fixture: ComponentFixture<QuizOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
