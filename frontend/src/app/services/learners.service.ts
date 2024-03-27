import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enroll } from '../shared/interface/subscribe';
import { Course } from '../shared/models/Course';

const Learners_Api = 'http://localhost:5000/api/learners/';

@Injectable({
  providedIn: 'root',
})
export class LearnersService {
  constructor(private http: HttpClient) {}
  //mehthod for updating learner subscription

  learnerSubscription(user: Enroll): Observable<Enroll> {
    return this.http.put<Enroll>(Learners_Api + 'subscription', user);
  }

  //method for getting subscriptions
  getSubscriptions(userId: string): Observable<Course[]> {
    return this.http.get<Course[]>(Learners_Api + 'getsubscriptions/' + userId);
  }
}
