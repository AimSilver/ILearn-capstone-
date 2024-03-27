import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { adminGuard } from './auth/guards/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { FacultyDetailsComponent } from './components/faculty-details/faculty-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { CoursePageComponent } from './components/course-page/course-page.component';
import { LearnersDetailsComponent } from './components/learners-details/learners-details.component';
import { LearnerSubscriptionsComponent } from './components/learner-subscriptions/learner-subscriptions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  {
    path: 'admin/faculty',
    component: FacultyDetailsComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'admin/learners',
    component: LearnersDetailsComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'admin/add-course',
    component: AddCourseComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'home/updateCourse/:id',
    component: UpdateCourseComponent,
    canActivate: [authGuard],
  },
  {
    path: 'course-page/:id',
    component: CoursePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'learners/subscriptions/:id',
    component: LearnerSubscriptionsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
