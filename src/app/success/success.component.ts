
/*** create model we want to show if success occurs ***/

import { Component, OnInit } from "@angular/core";
import { Success } from "./success.model";
import { SuccessService } from "./success.service";

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    // model background styles
    styleUrls: ['./success.component.css']
})

// listens to emitted success events
export class SuccessComponent implements OnInit{

    // create a new property named success of type success
    success: Success;
    // create a new property to determine whether modal display or not
    display = "none";

    // inject success service
    constructor(private successService: SuccessService) {}

    // if modal success is closed - handle click
    onSuccessHandled() {

        // set modal display style to none
        this.display = 'none';
    }

    // listen to success occured emitter in success service
    ngOnInit() {

        this.successService.successOccured
            .subscribe(

                (success: Success) => {
                    // this success in component set to success passed
                    this.success = success;
                    // set style to show success modal
                    this.display = 'block';
                }
            );

    }

    // emit success in auth service - **** signup only so far ****
}
