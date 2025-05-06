import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistrationService, User } from '../../services/registration.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationService.getCurrentUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/registration']);
      } else {
        this.currentUser = user;
      }
    });
  }

  logout(): void {
    this.registrationService.logout();
    this.router.navigate(['/registration']);
  }
}
