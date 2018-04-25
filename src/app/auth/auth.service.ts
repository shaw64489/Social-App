/*** defines the authentication service - handle signin/signup/logout ***/

/*
    * Auth Service - ideas - references
    * Simon Holmes
    * https://www.sitepoint.com/user-authentication-mean-stack/
    *
*/
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";
import { SuccessService } from "../success/success.service";




@Injectable()
export class AuthService {

    //current user
    currentUser: string;

    // reach out to server side - inject http service
    // inject error service
    constructor(private http: Http, private errorService: ErrorService, private successService: SuccessService) { }

    // signup method to signup a user
    signup(user: User) {


        console.log(user);

        // setup the request we want to send
        // message data in post body - take user and turn into json format
        const body = JSON.stringify(user);

        // headers - to let backend know that we're getting json data
        const headers = new Headers({ 'Content-Type': 'application/json' });

        // post to signup user route - handled in server side user route
        // add headers - body
        // chain map method - return in callback treated as data by observable
        // catch and handle errors
        return this.http.post('http://localhost:3000/user/signup', body, { headers: headers })

            // retrieve data with the response
            .map((response: Response) => {
                response.json();

                // handle successful signup in success service
                // pop up modal
                this.successService.handleSuccess(response.json());
            })

            // catch any errors
            .catch((error: Response) => {

                // handle with error service
                // pass json error
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }

    // create a signin method to signin a user - pass user
    signin(user: User) {

        // setup the request we want to send
        // message data in post body - take user and turn into json format
        const body = JSON.stringify(user);

        // headers - to let backend know that we're getting json data
        const headers = new Headers({ 'Content-Type': 'application/json' });

        // post to signin user route - handled in server side user route
        // add headers - body
        // chain map method - return in callback treated as data by observable
        // catch and handle errors
        return this.http.post('http://localhost:3000/user/signin', body, { headers: headers })

            // retrieve data with the response
            .map((response: Response) =>
                response.json())

            // catch any errors
            .catch((error: Response) => {

                // handle with error service
                // pass json error
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }

    // on logout - clear local storage
    logout() {
        localStorage.clear();
    }

    // check if user is logged in - conditional to show tabs
    userLoggedIn() {

        // check if token exists
        // returns true if token exists - false if not
        return localStorage.getItem('token') !== null
    }

    // return current user
    getCurrentUser() {

        return this.currentUser;
    }

}
