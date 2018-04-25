/*** defines the signup component ***/

/*
* Referenced for validation ideas
* Asim
* https://codecraft.tv/courses/angular/forms/model-driven-validation/
*
*/

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    // get signup form
    myForm: FormGroup;

    // inject auth service
    constructor(private authService: AuthService) {}

    // on form submission - try to create new user
    onSubmit() {

        // create a new user - pass user data from form
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );

        // use auth service and pass user to signup method
        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );

        // reset form after submitting
        this.myForm.reset();
    }

    // create controls for the form elements
    ngOnInit() {

        this.myForm = new FormGroup({

            // register controls
            // pass value - validator
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),

            //validate that user puts a real email
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9]([a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)")
            ]),
            password: new FormControl('', Validators.required),

        });
    }

}
