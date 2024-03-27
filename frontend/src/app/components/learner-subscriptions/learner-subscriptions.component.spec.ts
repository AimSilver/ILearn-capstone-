import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerSubscriptionsComponent } from './learner-subscriptions.component';

describe('LearnerSubscriptionsComponent', () => {
  let component: LearnerSubscriptionsComponent;
  let fixture: ComponentFixture<LearnerSubscriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnerSubscriptionsComponent]
    });
    fixture = TestBed.createComponent(LearnerSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
