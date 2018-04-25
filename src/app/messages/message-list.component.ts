/*** defines the message listings for the public post and profile pages ***/

import { Component, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{

    // new message array object using message model - array of messages
    messages: Message[];

    //i: number;
    // sets profile value to falue to show this not profile page so edit buttons show
    profile: boolean = false;

    // inject message service
    constructor(private messageService: MessageService) {

    }

    // toTop method executed to scroll to the top of the page
    toTop() {

        // scroll to top of page - smooth
        try { 
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }); 
        } catch (e) { 
            window.scrollTo(0, 0); 
        }
    }


    // subscribe and getMessages from message service - to loop through and list each user message
    ngOnInit() {
        this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                });
    }
}
