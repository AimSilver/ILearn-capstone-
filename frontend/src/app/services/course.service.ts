import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../shared/models/Course';

const Course_Api = 'http://localhost:5000/api/';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  //getting all courses
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(Course_Api + 'home');
  }
  //getting course by id
  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(Course_Api + 'course-page/' + courseId);
  }
}
