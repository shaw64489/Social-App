/*** create header section ***/

import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Router } from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    id: string;
    // set up application name
    appName: string = 'postNchat';

    // inject auth service - check user login status
    constructor(private authService: AuthService, private router: Router) {}

    /*
    * Auth Service - gathering ideas - references
    * Simon Holmes
    * https://www.sitepoint.com/user-authentication-mean-stack/
    *
    */

    // check user login status
    userLoggedIn() {

        // reach out to authService is logged in
        // control with ngIf directives in template - to show and hide navigation items
        return this.authService.userLoggedIn();

    }

    // redirect to user profile
    toUserProfile() {

        // navigate to user ID profile page
        this.router.navigateByUrl('/profiles/' + this.id);
    }

    ngOnInit() {

        // retrieve and store user ID - will be used to pass for user profile
        this.id = localStorage.getItem('userId');

    }

}


