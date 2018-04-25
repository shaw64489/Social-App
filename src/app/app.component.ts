/*
* Starting point
* sets up whatever html should be rendered when loaded
*/
import { Component } from '@angular/core';
import { MessageService } from './messages/message.service';
import { componentFactoryName } from '@angular/compiler';


// decorator
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    // create singe instance of message service for the app component
    // and all its child components - profile, message input, list
    providers: [MessageService]
    
})
export class AppComponent {
    
    
}