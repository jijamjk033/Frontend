import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);
  loginService = inject(AuthService);
  ngOnInit(): void {
    if (!this.loginService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
