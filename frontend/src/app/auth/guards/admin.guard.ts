import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(AuthService);
  const toastrService = inject(ToastrService);
  //checking if current user is admin or not
  if (userService.currentUser && userService.currentUser.isAdmin) {
    //if admin alow access
    return true;
  }
  //if not admin
  toastrService.error('access denied');
  router.navigate(['/dashboard']);
  return true;
};
