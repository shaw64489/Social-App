import { EventEmitter } from "@angular/core";
import { Success } from "./success.model";

// allows us to pass success messages and emit them and show success modal

export class SuccessService {

    // event emitter of type success if success occured
    successOccured = new EventEmitter<Success>();

    // emit if method is called
    // get success of type any
    handleSuccess(success: any) {

        // create new success based on model - tile, message
        // able to access and display success title and success message in the success object
        const successData = new Success(success.title, success.message);

        // emits event so we can subscribe and call in other places
        this.successOccured.emit(successData);

    }
}