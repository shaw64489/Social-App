/*** handle user profile page ***/

import { Component, OnInit } from "@angular/core";
import { Message } from "../messages/message.model";
import { MessageService } from "../messages/message.service";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";


//decorator
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    // new message array object using message model - array of user messages
    messages: Message[];

    // used to store user name from local storage
    user: string;

    // used to determing if profile page - hide edit option
    // can only edit post on public post page right now
    profile: boolean = true;

    // inject auth and message services
    constructor(private messageService: MessageService, private authService: AuthService) {

    }

    // toTop method executed when scroll to top icon is clicked
    toTop() {
        // scroll to top of page on edit - smooth scroll
        try {
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        } catch (e) {
            window.scrollTo(0, 0);
        }


    }

    // run this method automatically
    ngOnInit() {

        // subscribe and getProfileMessages from message service
        // will retrieve only messages posted by this user
        this.messageService.getProfileMessages()
            .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
            });

        // retrieve user name from local storage
        this.user = localStorage.getItem('userName')
            ? localStorage.getItem('userName') : '';

    }
}

