
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);
  authService = inject(AuthService);
  ngOnInit(): void {
    if (!this.authService.LoggedIn) {
      this.router.navigateByUrl('/adminlogin');
    }
  }

  createUser(){
    this.router.navigate(['/new'])
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/adminlogin'])
  }
}
