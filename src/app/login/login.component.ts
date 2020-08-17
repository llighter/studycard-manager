import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
      private router: Router
      , public auth: AuthService
  ) { }

  async ngOnInit() {
    const uid = await this.auth.uid();
    const isLoggedIn = !!uid;

    if (isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

}
