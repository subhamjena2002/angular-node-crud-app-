import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../landingPage/admin-service.service';
import { AdminComponent } from '../landingPage/admin/admin.component';
import { UserModel } from '../model/UserModal'; 
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css'],
})
export class MyModalComponent implements OnInit {
  getSingleUserData: any;
  index: number = 0;
 UserData: UserModel = new UserModel();

  email: string = '';
  password: string = '';
  confirm_password: string = '';
  phone_no: number = 0;
  Full_name: string = '';

  constructor(
    private adminService: AdminServiceService,
    private adminComponent: AdminComponent,
    public dialogRef: MatDialogRef<MyModalComponent> 
  ) {}

  ngOnInit(): void {
    const indexNumber = sessionStorage.getItem('indexNumber');
    if (indexNumber !== null) {
      this.adminService.getSingleUser(indexNumber).subscribe((data) => {
        this.getSingleUserData = data;
        this.email = this.getSingleUserData.result[0].email;
        this.password = this.getSingleUserData.result[0].password;
        this.phone_no = this.getSingleUserData.result[0].phoneno;
        this.Full_name = this.getSingleUserData.result[0].name;
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  sendUserData() {
    this.UserData.email = this.email;
    this.UserData.name = this.Full_name;
    this.UserData.password = this.password;
    this.UserData.phoneno = this.phone_no;
  }

  onSubmit() {
    const index = sessionStorage.getItem('indexNumber');
    if (index !== null) {
      const indexNumber = JSON.parse(index);
      this.sendUserData();
      this.adminService.updateUser(indexNumber, this.UserData).subscribe((result) => {
        this.close();
        this.adminComponent.getUserDetails();
      });
    }
  }
}
