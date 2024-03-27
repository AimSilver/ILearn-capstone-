import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUserRegister } from 'src/app/shared/interface/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  isSubmitted: boolean = false;
  returnUrl = '';
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]), // Corrected this line
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      role: new FormControl('', [Validators.required]),
    },
    { validators: [PasswordsMatchValidator('password', 'confirmPassword')] }
  );

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return; // If invalid, stop further execution of the code
    const fv = this.registerForm.value;
    const user: IUserRegister = {
      username: fv.name!,
      email: fv.email!,
      password: fv.password!,
      address: fv.address!,
      confirmPassword: fv.confirmPassword!,
      role: fv.role!,
    };
    this.authService.signup(user).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
