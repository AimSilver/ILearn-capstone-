import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/models/Course';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  courses: Course[] = [];
  user!: User;

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log(this.courses);
        console.log(this.user);
        console.log(courses[0].id);
      },
      error: (error) => {
        console.error('There was an error fetching courses!', error);
      },
    });
    this.authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }
}
