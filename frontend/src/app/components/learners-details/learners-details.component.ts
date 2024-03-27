import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-learners-details',
  templateUrl: './learners-details.component.html',
  styleUrls: ['./learners-details.component.css'],
})
export class LearnersDetailsComponent {
  allUsers: any[] = [];

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {
    this.adminService.getAllUsersDetails().subscribe((users: any[]) => {
      const learners = users.filter((obj) => obj.role === 'learner');
      console.log(learners);
      this.allUsers = learners;
    });
  }
  handleToggleBlock(userId: string) {
    // Call the adminservice method to toggle block status for the specified learner
    this.adminService.toggleBlock(userId).subscribe({
      next: (isBlocked) => {
        // Find the learner in the list of learners and update the block status locally in the component
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
