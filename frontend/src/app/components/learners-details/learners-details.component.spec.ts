import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnersDetailsComponent } from './learners-details.component';

describe('LearnersDetailsComponent', () => {
  let component: LearnersDetailsComponent;
  let fixture: ComponentFixture<LearnersDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnersDetailsComponent]
    });
    fixture = TestBed.createComponent(LearnersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
