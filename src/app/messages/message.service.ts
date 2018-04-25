/*** handles all message logic and calls to server side - posting/retrieving messages  ***/

/* 
* Referenced to look at how tokens are used in different ways
* https://stackoverflow.com/questions/39840457/how-to-store-token-in-local-or-session-storage-in-angular-2
*
*/


import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Message } from "./message.model";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";


// use Injectable decorator
@Injectable()
export class MessageService {

    // used to determine whether to show post option or not - message input
    showPost: boolean = false;

    // array of messages - store/manage messages in front end
    private messages: Message[] = [];

    // edit message event emitter - emit a message object
    editedMessage = new EventEmitter<Message>();
    // show message event emitter - whether to show message input option or not
    showingMessage = new EventEmitter<boolean>();
    // get index event emitter - each message has an index id attribute
    // this allows us to anchor back to the message when edit is submitted
    gettingIndex = new EventEmitter<number>();

    // inject http and error service
    constructor(private http: Http, private errorService: ErrorService) {

    }


    // add message - get message as arg as type message
    // when user posts a message
    addMessage(message: Message) {

        // setup the request we want to send
        // message data in post body - take message and turn into json format
        const body = JSON.stringify(message);

        // set content type to work correctly
        const headers = new Headers({ 'Content-Type': 'application/json' });

        // check if we have a token in local storage
        // if not null set token const equal to string for query
        // empty if not
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token') : '';


        // post to add message route - handled in server side message route
        // add headers - add token as query string
        // chain map method - return in callback treated as data by observable
        // catch and handle errors
        return this.http.post('http://localhost:3000/message' + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();

                // use callback data to create new front end message
                const message = new Message(
                    result.data.content,
                    result.user.firstName,
                    result.data.photo,
                    result.data._id,
                    result.user._id,
                    result.data.comments,
                    result.data.date,
                    result.data.latitude,
                    result.data.longitude);

                // place in messages array as first item before returning messages
                this.messages.unshift(message);
                return message;
            })
            .catch((error: Response) => {

                // handle with error service
                // pass json error
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // get all messages - to load on public post page
    getMessages() {

        // create observable using get method - handled in server side message route
        // transform response with the map method
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {

                // retrieve messages - data defined messages in backend
                const messages = response.json().data;

                //set as empty array
                let frontMessages: Message[] = [];

                // loop through messages in messages constant
                for (let message of messages) {

                    console.log(message);
                    // add new message to frontMessages array
                    frontMessages.unshift(new Message(
                        message.content,
                        message.user.firstName,
                        message.photo,
                        message._id,
                        message.user._id,
                        message.comments,
                        message.date,
                        message.latitude,
                        message.longitude));
                }

                // keep everything alike
                this.messages = frontMessages;

                // return array of messages
                return frontMessages;
            })
            .catch((error: Response) => {

                // handle with error service
                // pass json error
                console.log(error);
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // get profile messages - to load on profile page
    getProfileMessages() {

        // retrieve current user ID from local storage
        let userId = localStorage.getItem('userId');

        // create observable using get method - handled in server side profile route
        // add user ID parameter
        // transform response with the map method
        return this.http.get('http://localhost:3000/profile/' + userId)
            .map((response: Response) => {

                console.log("get profile");

                // retrieve messages - data defined messages in backend
                const messages = response.json().data;
                console.log(messages);

                // transform so messages work on front end
                // set as empty array
                let frontMessages: Message[] = [];

                // loop through messages in messages constant
                for (let message of messages) {

                    // add new message to frontMessages array
                    frontMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message.photo,
                        message._id,
                        message.user._id,
                        message.comments,
                        message.date,
                        message.latitude,
                        message.longitude));
                }

                // keep everything alike
                this.messages = frontMessages;

                // return array of messages
                return frontMessages;
            })
            .catch((error: Response) => {

                //  handle with error service
                //  pass json error
                console.log(error);
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // edit message
    // pass the message and index id of message that should be edited
    editMessage(message: Message, index: number) {

        // set to true so that the message input form displays
        this.showPost = true;

        // inform message input component to load this message
        this.editedMessage.emit(message);

        // inform message input component to show input form
        this.showingMessage.emit(this.showPost);

        // inform message input component of the edited message id index
        this.gettingIndex.emit(index);

    }

    // update existing message through edit - pass edited message
    updateMessage(message: Message) {

        // setup the request we want to send
        // message data in post body - take message and turn into json format
        const body = JSON.stringify(message);

        // set content type to work correctly
        const headers = new Headers({ 'Content-Type': 'application/json' });

        // check if we have a token in local storage
        // if not null set token const equal to string for query
        // empty if not
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token') : '';
        
        // patch to update message route - handled in server side message route
        // add headers - add  messageID as parameter and token as query string
        // chain map method - return in callback treated as data by observable
        // catch and handle errors
        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {

                //  handle with error service
                //  pass json error
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });


    }

    // delete existing message - pass message to delete
    deleteMessage(message: Message) {

        // remove message from front end message array using index of message passed
        this.messages.splice(this.messages.indexOf(message), 1);

        // check if we have a token in local storage
        // if not null set token const equal to string for query
        // empty if not
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token') : '';

        // delete - to delete message route - handled in server side message route
        // add messageID as parameter and token as query string
        // chain map method - return in callback treated as data by observable
        // catch and handle errors
        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {

                //  handle with error service
                //  pass json error
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    // add comment - accept message Id and comment object
    addComment(messageId: Number, comment: { name: string; comment: string }) {

        // setup the request we want to send
        // message data in post body - take message and turn into json format
        const body = JSON.stringify(comment);

        // set content type to work correctly
        const headers = new Headers({ 'Content-Type': 'application/json' });

        // check if we have a token in local storage
        // if not null set token const equal to string for query
        // empty if not
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token') : '';

        console.log(body);

        // post - to post comment in message route - handled in server side message route
        // add messageID as parameter and token as query string
        // chain map method - return in callback treated as data by observable
        // catch and handle errors
        return this.http.post('http://localhost:3000/message/comment/' + messageId + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {

                //  handle with error service
                //  pass json error
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }
}