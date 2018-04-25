/*** create comment form component ***/

// handles comments created on messages

import { Component, EventEmitter,Input, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MessageService } from "../../messages/message.service";

@Component({
  selector: 'app-entry-comment-form',
  templateUrl: './entry-comment-form.component.html',
  styleUrls: ['./entry-comment-form.component.css']
})
export class EntryCommentFormComponent {

    // initialize comment and name to empty
    name: string = "";
    comment: string = "";

    // input message Id from parent component
    @Input() messageId: number;

    // output - send data to parent via event emitter
    // emit comment 
    @Output() onCommentAdded = new EventEmitter<{ name: string; comment: string; }>();

    // comment form
    // viewchild to inspect local variables - commentEntryForm
    @ViewChild('commentEntryForm') commentEntryForm: NgForm;

    //inject message service
    constructor(private messageService: MessageService,) { }

    // on submitting the comment form - pass form
    onSubmit(commentEntryForm: NgForm) {

        // check if form is valid
        if (this.commentEntryForm.invalid) return;

        // create comment - name and comment
        let comment = { name: this.name, comment: this.comment };

        // addComment method - message service - pass messageId so we can add comment to the correct message
        this.messageService.addComment(this.messageId, comment)
            .subscribe(() => {

                // emit an event which will trigger onCommentAdded in messageComponent - comment
                this.onCommentAdded.emit(comment);

                // reset comment form after submission
                this.commentEntryForm.resetForm();
            });
            

    }

}
