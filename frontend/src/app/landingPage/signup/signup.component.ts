import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminServiceService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      password: [''],
      email: [''],
      phoneno: [''],
    });
    
  }

  onSubmit() {
    const userCredentials = this.signupForm.value;
    this.adminService.createUser(userCredentials).subscribe((resp:any) => {
      this.signupForm.reset()
      
    });
  }
}
