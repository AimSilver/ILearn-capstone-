import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/models/Course';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css'],
})
export class UpdateCourseComponent {
  //unique id ofcourses
  courseId!: string;

  updateCourseForm = new FormGroup({
    courseName: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
  });
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private toastrService: ToastrService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.courseId = params.id;
        this.courseService.getCourseById(params.id).subscribe((course) => {
          const courseData = {
            courseName: course.coursename,

            price: course.price,
          };
          //populate form data with fetched course data
          this.updateCourseForm.patchValue(courseData);
        });
      } else {
        console.log(`cannot find ${params.id}`);
      }
    });
  }

  //logic for updating course
  updateCourse() {
    if (this.updateCourseForm.valid) {
      const fv = this.updateCourseForm.value;
      const course: Course = {
        coursename: fv.courseName!,

        price: fv.price!,
        id: this.courseId,
      };
      this.adminService.AdminUpdateCourse(course).subscribe(() => {});
      this.toastrService.success(
        `Course "${course.coursename}" updated successfully!`
      );
    } else {
      this.toastrService.error('Failed to update the course.');
    }
  }
}
