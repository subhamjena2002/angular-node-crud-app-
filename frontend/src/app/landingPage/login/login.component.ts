import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  getUserCredentials: any;
  constructor(
    private adminService: AdminServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
  }
  email: any = '';
  password: any = '';
  token: any;
  getUserData() {
    this.getUserCredentials = {
      email: this.email,
      password: this.password,
    };
  }
  login() {
    this.adminService
      .loginUser(this.getUserCredentials)
      .subscribe((data: any) => {
        if (data.code === 200) {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('isLoggedin', 'true');
          }
        }
        const token = JSON.stringify(data.token);

        if (typeof localStorage !== 'undefined') {
          sessionStorage.setItem('token', token);
        }
        this.router.navigate(['/home']);
      });
  }
}
