import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../shared/models/Course';
import { User } from '../shared/models/User';

const Admin_Api = 'http://localhost:5000/api/admin/';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllUsersDetails(): Observable<any[]> {
    return this.http.get<any[]>(Admin_Api + 'userdetails');
  }

  //mehthod for updating course

  AdminUpdateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(Admin_Api + 'update-course', course);
  }

  //method for adding course
  AdminAddNewCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(Admin_Api + 'add-course', course);
  }
  //method for handling blocking/unblocking
  toggleBlock(userId: string): Observable<boolean> {
    return this.http.put<boolean>(Admin_Api + 'toggleBlock/' + userId, {});
  }
}
