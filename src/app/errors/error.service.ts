/*** create error service to handle errors ***/

import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";

// allows us to pass errors and emit them and show error modal
export class ErrorService {

    // event emitter if error occured
    errorOccured = new EventEmitter<Error>();

    // emit if method is called
    // get error 
    handleError(error: any) {

        // create new error based on model defined in error.model
        // access error title and error message in the error object
        const errorData = new Error(error.title, error.error.message);

        // emits event so we can subscribe and call in app
        this.errorOccured.emit(errorData);

    }
}