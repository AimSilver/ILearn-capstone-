import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //constructor with dependency injection
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  //form submition
  isSubmitted = false;
  //returnUrl is a property used to store the URL the user tried to access before being redirected to the login page.
  //This typically happens when a user attempts to access a protected route without being logged in.
  //In the ngOnInit lifecycle hook, the component captures the returnUrl from the query parameters of the current route using activatedRoute.snapshot.queryParams.returnUrl.
  returnUrl = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  //using activated route service for fettching current route and querry parameters

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return; //In this case, return prevents further execution of the code below this block.

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    //calling login method from auth service and passing login details

    this.authService
      .signin({
        email: email,
        password: password,
      })
      .subscribe(() => {
        //after successfull login navigate to the stored url or the url u want to
        this.router.navigateByUrl('/home');
      });
  }
}
