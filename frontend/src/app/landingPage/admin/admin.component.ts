import { Component, OnInit, ViewChild } from '@angular/core';
import { MyModalComponent } from '../../my-modal/my-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userDtails: any;
  currentPage = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog,private adminService:AdminServiceService) {}

  openModal(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUserDetails();
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  
  }

  getUserDetails(): void {
   
    this.adminService.getAllUsers().subscribe((data)=>{
      this.userDtails = data
    })
    
      
  }

  deleteUser(userId: number): void {
    
   this.adminService.deleteUser(userId).subscribe((res)=>{
    this.getUserDetails();
    console.log(res);
    
   })
  }

  setUserData(index: number): void {
    sessionStorage.setItem("indexNumber",JSON.stringify(index))
  }

  handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getMaxPageIndex(): number {
    return Math.ceil(this.userDtails.length / this.pageSize) - 1;
  }

  getDisplayedUserDetails(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.userDtails.slice(startIndex, endIndex);
  }
}
