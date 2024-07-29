import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable, map } from 'rxjs';
import { User } from '../../store/user';
import { Store, select } from '@ngrx/store';
import { fetchUserAPI } from '../../store/adminUser/user.action';
import { userSelectorData } from '../../store/adminUser/user.selector';
import { FormsModule } from '@angular/forms';
import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [HeaderComponent,FormsModule,CommonModule,AsyncPipe]
})
export class DashboardComponent {

  searchQuery: string = '';
  filteredUsers: User[] = [];
  users$!: Observable<User[]>;
  constructor(private store: Store<{ allUser: User[] }>, private userServices: AuthService, private router : Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('adminToken')){
      this.router.navigate(['/adminlogin'])
    }
    this.store.dispatch(fetchUserAPI())
    this.users$ = this.store.select(userSelectorData)
    console.log(this.users$);
    
    this.filteredUsers=[];
  }

  deleteUser(id: string) {
    const sure = confirm('Are You Sure!')
    if(sure){
      this.userServices.deleteUser(id).subscribe((response) => {
        alert(response.message)
        this.store.dispatch(fetchUserAPI())
      }, (error) => {
        alert(error)
      })
    }
  }

  editUser(id:string){
    this.userServices.setId(id)
    this.router.navigate(['/edit'])
  }

  filterUsers() {
    this.users$.pipe(
      map(users => {
        return users ? users.filter((user: User) =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        ) : [];
      })
    ).subscribe(filteredUsers => {
      this.filteredUsers = filteredUsers;
    });
  }
}
