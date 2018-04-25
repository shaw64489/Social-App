/*** defines the signin component ***/

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { AuthService } from "./auth.service";



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

    // get form 
    myForm: FormGroup;

    // inject auth service
    // inject router to redirect to homepage
    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {

        console.log("Hello user");

        // create a new user
        const user = new User(this.myForm.value.email, this.myForm.value.password);

        // use auth service and pass user to signin method - pass user
        this.authService.signin(user)
            .subscribe(

                // set and store localstorage items
                // set key as token and store token as value
                // set key as userId and store userId as value
                // set key as userName and store userName as value
                data => {
                    localStorage.setItem('token', data.token),
                    localStorage.setItem('userId', data.userId),
                    localStorage.setItem('userName', data.userName),

                    // access router and navigate to root route of app
                    this.router.navigateByUrl('/')
                },
                error => console.error(error)
            );

        // reset the form after submitting
        this.myForm.reset();
    }

    // create controls for the form elements
    ngOnInit() {

        this.myForm = new FormGroup({

            // register controls
            // pass value - validator
            // validate that user puts a real email
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9]([a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)")
            ]),
            password: new FormControl('', Validators.required)

        });
    }
   
}
