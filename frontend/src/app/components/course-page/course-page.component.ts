import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LearnersService } from 'src/app/services/learners.service';
import { courseData } from 'src/app/shared/interface/courseData';
import { Enroll } from 'src/app/shared/interface/subscribe';
import { Course } from 'src/app/shared/models/Course';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
})
export class CoursePageComponent implements OnDestroy {
  courseId!: string;
  course!: Course;
  courseData!: courseData;

  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private http: HttpClient,
    private toastrService: ToastrService,
    private learnerService: LearnersService,
    private authService: AuthService
  ) {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params.id) {
          this.courseId = params.id;
          this.courseService
            .getCourseById(params.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((course) => {
              if (course) {
                this.course = course;
                console.log(course);
                //method for fetching course page content
                this.http
                  .get<courseData>(
                    `../../../assets/courses/${course.coursename}.json`
                  )
                  .pipe(takeUntil(this.destroy$))
                  .subscribe((data) => {
                    this.courseData = data;
                  });
              } else {
                console.error('failed to get course by id');
              }
            });
        } else {
          console.error('failed to get param.id');
        }
      });
  }

  addSubscription() {
    this.authService.userObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentuser) => {
        console.log(currentuser);
        console.log(currentuser.id);
        currentuser.subscriptions = currentuser.subscriptions || [];
        const sub = currentuser.subscriptions;
        const subscription = [...sub, this.courseId];
        const Id = currentuser.id;
        console.log(this.courseId);

        const user: Enroll = {
          id: Id,
          subscriptions: subscription,
        };
        this.learnerService
          .learnerSubscription(user)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {});
        this.toastrService.success('Enrolled Successfully');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
