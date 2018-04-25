/*** create error component ***/

// create modal we want to show if error occurs
// listens to emitted events and errors

import { Component, OnInit } from "@angular/core";
import { Error } from "./error.model";
import { ErrorService } from "./error.service";


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{

    // create a new error property
    error: Error;
    // create a new property to determine whether to display error modal or not
    display = "none";

    // inject error service
    constructor(private errorService: ErrorService) {}

    // if error modal is closed - handle click
    // set display to none for modal
    onErrorHandled() {
        this.display = 'none';
    }

    // listen to error occured emitter in error service
    ngOnInit() {

        this.errorService.errorOccured
            .subscribe(
                (error: Error) => {

                    // this error in component set to error passed
                    this.error = error;
                    // set style to show error
                    this.display = 'block';
                }
            );
    }

    //emit error in message service
}
