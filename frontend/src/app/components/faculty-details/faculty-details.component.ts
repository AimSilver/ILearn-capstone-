import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrls: ['./faculty-details.component.css'],
})
export class FacultyDetailsComponent {
  allUsers: any[] = [];

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {
    this.adminService.getAllUsersDetails().subscribe((users: any[]) => {
      const faculty = users.filter((obj) => obj.role === 'faculty');
      console.log(faculty);
      this.allUsers = faculty;
    });
  }
  handleToggleBlock(userId: string) {
    // Call the adminservice method to toggle block status for the specified faculty
    this.adminService.toggleBlock(userId).subscribe({
      next: (isBlocked) => {
        // Find the faculty in the list of users and update the block status locally in the component
        const user = this.allUsers.find((l) => l.id === userId)!;
        if (user) {
          user.isBlocked = isBlocked;
        }
      },
      error: (err) => {
        // Display error msg
        this.toastrService.error(err.error);
        console.log(err.error);
      },
    });
  }
}
