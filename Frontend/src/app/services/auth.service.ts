import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Profile, User } from '../modules/store/user';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userToken: string | null = null;
  private adminToken:string | null =null
  id!: string;
  private apiUrl:string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createUser(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  getUserToken(): string | null {
    return this.userToken;
  }
  getAdminToken(): string | null {
    return this.adminToken;
  }

  setId(id: string) {
    this.id = id;
  }

 get isLoggedIn() {
    if(localStorage.getItem('userToken')){
      return true;
  }else{
    return false
  }
 }


  // getUser(userData: any): Observable<boolean> {
  //   return this.http.post<any>(`${this.apiUrl}/login`, userData)
  //     .pipe(
  //       map(response => {
  //         if (response.userToken) {
  //           this.userToken = response.userToken;
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       })
  //     );
  // }

  getUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
  
  fetchUserProfile(userId: any): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/profile?id=${userId}`)
  }

  profileUpload(file: object, id: string | null) {
    return this.http.post(`${this.apiUrl}/image?id=${id}`, file)
  }

  profileDelete(id: string | null) {
    return this.http.delete(`${this.apiUrl}/imageDelete?id=${id}`)
  }

  loginAdmin(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/adminlogin`, userData);
  }
  get LoggedIn() {
    if(localStorage.getItem('adminToken')){
      return true;
  }else{
    return false
  }
  }

  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/fetchUsers`)
  }


  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteUser?id=${id}`)
  }

  createNewUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, userData)
  }

  updateUser(userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/update`, userData)
  }
}




