import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, public authService: AuthService,private router:Router) { }
  //register = inject(AuthService);
  //fb = inject(FormBuilder);

  submit: boolean = false;
  inCorrect: boolean = false;
  emailUsed!: string;

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'
        ),
      ],
    ],
    cpassword: ['', [Validators.required]],
  });

  onSubmit() {
    this.submit = true;
    const { name, email, password, cpassword } = this.registerForm.value;
    if (cpassword === password) {
      if (name && email && password) {
        this.registerUser();
      }
    } else {
      this.inCorrect = true;
      setTimeout(() => {
        this.inCorrect = false;
      }, 2000);
    }
  }


 
  registerUser(): void {
    this.authService.createUser(this.registerForm.value).subscribe({
      next: (response) => {
        if (response.emailUsed) {
          this.emailUsed = response.emailUsed;
          setTimeout(() => {
            this.emailUsed = '';
          }, 2000);
        } else {
          alert('Registration Completed!');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
  

}
