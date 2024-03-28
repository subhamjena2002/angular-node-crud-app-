import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { UserModel } from '../model/UserModal';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(private http: HttpClient,private router : Router) {}


  baseURL = 'http://localhost:3000/api';
  // baseURL ='http://10.30.30.222:3000/api'
  private getToken(): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('token');
    } else {
      return null;
    }
  }
 
   
  createUser(data:any):Observable<any> {
    return this.http.post(`${this.baseURL}/postUserData`,data);
  }

  getAllUsers(){
    const token = this.getToken();
    if (token !== null) {
      const parsedToken = JSON.parse(token) as object;
      console.log(parsedToken);
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parsedToken}`,
      });
    
      return this.http.get(`${this.baseURL}/getUserData`, { headers });
    } else {
      return new Observable(observer => {
        observer.error('Token not found');
      });
    }
  }

  deleteUser(userId:number){
    return this.http.delete(`${this.baseURL}/users/${userId}`)
  }

  getSingleUser(userId:any){
    return this.http.get(`${this.baseURL}/getUserData/${userId}`)
  }

  updateUser(userId:number,data:any){
    return this.http.put(`${this.baseURL}/updateUserData/${userId}`,data)
  }

  loginUser(data:any){
    return this.http.post(`${this.baseURL}/login`,data)
  }

logout(){
  return this.router.navigate(['/login']);
}
}
