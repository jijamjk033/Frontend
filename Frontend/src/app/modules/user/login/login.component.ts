import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginService=inject(AuthService)
  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) { }

  submit: boolean = false
  emailMessage!:string
  passMessage!:string
  user!:string

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]]
  })

  ngOnInit() {
    if (this.loginService.isLoggedIn) {
      this.router.navigateByUrl('/home');
    }else if(this.loginService.LoggedIn){
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit() {
    this.submit = true
    if(this.loginForm.value.email){
      this.userLogin()
    }
  }

  userLogin() {
    this.authService.getUser(this.loginForm.value).subscribe(
      (response: any) => {
        if(response.passMatch){
          this.passMessage = response.passMatch
        }else if(response.emailMatch){
          this.emailMessage = response.emailMatch
        }else{
          this.user = response.user
          localStorage.setItem('userToken', response.userToken);
          localStorage.setItem('userId',response.userId)
          this.router.navigate(['/home'])
        }
        setTimeout(()=>{
          this.passMessage = ""
          this.emailMessage = "" ;
        },2000)
      }, (error) => {
        console.log(error)
      }
    )
  }
}
