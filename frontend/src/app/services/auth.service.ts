import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interface/IUserLogin';
import { IUserRegister } from '../shared/interface/IUserRegister';
import { User } from '../shared/models/User';
import { ToastrService } from 'ngx-toastr';

const Auth_Api = 'http://localhost:5000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const USER_KEY = 'User'; //for local storage

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastService: ToastrService) {
    // Create an observable from the userSubject
    this.userObservable = this.userSubject.asObservable();
  }
  // Getter for the current user
  public get currentUser(): User {
    return this.userSubject.value;
  }

  signin(userLogin: IUserLogin): Observable<User> {
    return this.http
      .post<User>(Auth_Api + 'login', userLogin, httpOptions)
      .pipe(
        tap({
          next: (user) => {
            // Save the logged in user to local storage and using toast trigger a notification
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.toastService.success(
              `Welcome to Ilearn${user.username}!`,
              'Login Successful'
            );
          },
          error: (errorResponse) => {
            // Display error message if login fails
            this.toastService.error(errorResponse.error, 'Login Failed');
          },
        })
      );
  }
  //method for registration
  signup(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(Auth_Api + 'signup', userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastService.success(
            `welcome to Ilearn ${user.username}!`,
            `Registeration Successfull`
          );
        },
        error: (errorResponse) => {
          //error message
          this.toastService.error(errorResponse.error, `Registration Failed`);
        },
      })
    );
  }
  //method for logout
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  // Method to set user data to local storage
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  // Method to get user data from local storage
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return new User();
  }
}
