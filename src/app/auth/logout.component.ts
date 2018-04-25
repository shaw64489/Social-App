/*** defines the logout component ***/

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  // inject auth service and router
  constructor(private authService: AuthService, private router: Router) { }

  // click event on logout
  onLogout() {

    // logout user in auth service
    this.authService.logout();

    // navigate away to using router
    this.router.navigate(['/', 'signin'])

  }

  ngOnInit() {
  }

}

