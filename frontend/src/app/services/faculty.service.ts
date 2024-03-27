import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../shared/models/Course';
import { Observable } from 'rxjs';

const Faculty_Api = 'http://localhost:5000/api/faculty/';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  constructor(private http: HttpClient) {}
}
