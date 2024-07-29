import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { fetchUserAPISuccess } from '../../store/adminUser/user.action';
import { User } from '../../store/user';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-edit-user',
    standalone: true,
    templateUrl: './edit-user.component.html',
    styleUrl: './edit-user.component.scss',
    imports: [HeaderComponent,ReactiveFormsModule,CommonModule]
})
export class EditUserComponent {

  id!: string;
  name!: string;
  email!: string;

  submit: boolean = false
  inCorrect: boolean = false
  emailUsed!: string;
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router, private store: Store<{ allUser: User[] }>) { }


  ngOnInit(): void {
    this.id = this.authService.id;
    this.store.pipe(select(fetchUserAPISuccess)).subscribe((data) => {
      const value = Object.values(data)[1].find((data: any) => data._id === this.id)
      this.name = value.name
      this.email = value.email
    })
  }

  newUserForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
  })

  onSubmit() {
    this.submit = true
    const { name, email } = this.newUserForm.value
    if (name && email) {
      const sure = confirm("Are you sure! ")
      if (sure) {
        this.updateUser()
      }
    } else {
      this.inCorrect = true
      setTimeout(() => {
        this.inCorrect = false
      }, 2000)
    }
  }

  updateUser(): void {
    this.authService.updateUser(this.newUserForm.value).subscribe(
      (response) => {
        if (response.emailUsed) {
          this.emailUsed = response.emailUsed
          setTimeout(() => {
            this.emailUsed = ''
          }, 2000)
        } else {
          this.router.navigate(['/dashboard'])
          alert(response.message);
        }
      }, (error) => {
        console.log(error)
      })
  }

}
