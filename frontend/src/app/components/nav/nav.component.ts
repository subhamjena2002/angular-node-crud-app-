import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../landingPage/admin-service.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent  implements OnInit{
constructor(private adminService : AdminServiceService){

}
ngOnInit(): void {}


logout(){
  this.adminService.logout()
}

}
