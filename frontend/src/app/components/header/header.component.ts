import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user!: User;

  constructor(private authService: AuthService) {
    authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      console.log(newUser);
    });
  }

  logout() {
    this.authService.logout();
  }
}
