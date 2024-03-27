import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LearnersService } from 'src/app/services/learners.service';
import { Course } from 'src/app/shared/models/Course';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-learner-subscriptions',
  templateUrl: './learner-subscriptions.component.html',
  styleUrls: ['./learner-subscriptions.component.css'],
})
export class LearnerSubscriptionsComponent {
  userId!: string;
  subscribedCourses: Course[] = [];
  constructor(
    private learnerService: LearnersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.userId = params.id;
        this.learnerService.getSubscriptions(params.id).subscribe((courses) => {
          this.subscribedCourses = courses;
        });
      }
    });
  }
}
