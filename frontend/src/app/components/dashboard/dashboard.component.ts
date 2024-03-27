import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  user!: User;

  constructor(private authService: AuthService) {
    this.authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if (newUser) {
        console.log(newUser);
        this.user = newUser;
        console.log(this.authService.currentUser);
      } else {
        console.error('cannot get newUser');
      }
    });
  }
}
