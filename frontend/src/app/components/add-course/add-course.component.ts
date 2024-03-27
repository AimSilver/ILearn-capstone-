import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

import { Course } from 'src/app/shared/models/Course';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent {
  courseForm = new FormGroup({
    courseName: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
  });

  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  addNewCourse() {
    if (this.courseForm.valid) {
      const newCourseData = this.courseForm.value;
      console.log('New course:', newCourseData);
      const course: Course = {
        id: '',
        coursename: newCourseData.courseName!,

        price: newCourseData.price!,
      };
      // Handle form submission (e.g., send data to API)
      this.adminService.AdminAddNewCourse(course).subscribe(() => {
        // Reset the form after successful submission
      });
      this.toastrService.success(
        `Course ${course.coursename} successfully added `
      );
    } else {
      console.error('u missing something/check ur form code again');
      this.toastrService.error('Adding new course failed');
    }
  }
}
