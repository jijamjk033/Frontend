import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchUserAPI } from '../../store/adminUser/user.action';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-new-user',
    standalone: true,
    templateUrl: './new-user.component.html',
    styleUrl: './new-user.component.scss',
    imports: [HeaderComponent,FormsModule,CommonModule,ReactiveFormsModule]
})
export class NewUserComponent {
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router, private store: Store) { }

  submit: boolean = false
  inCorrect: boolean = false
  emailUsed!: string;

  newUserForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]],
    cpassword: ['', [Validators.required]]
  })

  onSubmit() {
    this.submit = true
    const { name, email, password, cpassword } = this.newUserForm.value
    if (cpassword === password) {
      if (name && email && password) {
        this.createNewUser()
      }
    } else {
      this.inCorrect = true
      setTimeout(() => {
        this.inCorrect = false
      }, 2000)
    }
  }

  createNewUser(): void {
    this.authService.createNewUser(this.newUserForm.value).subscribe(
      (response) => {
        if (response.emailUsed) {
          this.emailUsed = response.emailUsed
          setTimeout(() => {
            this.emailUsed = ''
          }, 2000)
        } else {
          this.store.dispatch(fetchUserAPI())
          this.router.navigate(['/dashboard'])
          alert('User Created Suceessfully!');
        }
      }, (error) => {
        console.log(error)
      })
  }
}
