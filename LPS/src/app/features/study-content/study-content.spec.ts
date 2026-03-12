import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyContent } from './study-content';

describe('StudyContent', () => {
  let component: StudyContent;
  let fixture: ComponentFixture<StudyContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyContent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
