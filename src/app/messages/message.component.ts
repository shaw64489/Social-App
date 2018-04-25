/*** child component of message list - defines each posted message ***/

import { Component, Input } from "@angular/core"
import { Message } from "./message.model";
import { MessageService } from "./message.service";



@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {

    // new message property of type Message (Model)
    // make this assignable from outside - @Input
    @Input() message: Message;

    // new index property of message
    // make this assignable from outside - @Input
    @Input() indexValueFromParent: number;

    // profile property check - show edit or not
    // make this assignable from outside - @Input
    @Input() profileParent: boolean;

    // inject messege service 
    constructor(private messageService: MessageService) { }

    // onEdit method executed when Edit button is clicked
    onEdit() {

        // scroll to top of page on edit
        try {
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        } catch (e) {
            window.scrollTo(0, 0);
        }

        // call message service edit message - pass message and index value
        this.messageService.editMessage(this.message, this.indexValueFromParent);

    }

    // onDelete method executed when Delete button is clicked
    onDelete() {

        console.log("Delete");

        // ask user if they are sure alert
        var x = confirm("Are you sure you want to delete?");

        // if they choose to delete
        if (x) {

            // call message service delete message - delete this message
            this.messageService.deleteMessage(this.message)
                .subscribe(
                result => console.log(result)
                );

        // if they dont choose to delete
        } else {
            return false;
        }
    }


    // check if message belongs to currently logged in user
    belongsToUser() {

        // get user id from local storage and see if it matches user Id related to message
        return localStorage.getItem('userId') == this.message.userId;
    }

    // method for when comment is added - update list of comments for entry
    // comment passed 
    onCommentAdded(comment: { name: string; comment: string; }) {

        console.log(this.message);

        // push the comment onto the existing comments
        this.message.comments.push(comment);

    }


}