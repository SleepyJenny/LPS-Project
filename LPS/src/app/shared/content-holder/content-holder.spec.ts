import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHolder } from './content-holder';

describe('ContentHolder', () => {
  let component: ContentHolder;
  let fixture: ComponentFixture<ContentHolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentHolder],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentHolder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
