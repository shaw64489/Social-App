/*** defines the message input for the public post ***/

import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { NgForm, FormControl } from "@angular/forms/";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
//may not use these ****
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

//import { ActivatedRoute } from '@angular/router'; *** dont need anymore ***



@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    styleUrls: ['./message-input.component.css'],
    animations: [
        trigger('fadeInOut', [
          state('in', style({opacity: 1, transform: 'translateY(-80%)'})),
          transition('void => *', [
            style({
              opacity: 0,
              transform: 'translateY(-100%)'
            }),
            animate('0.3s ease-in')
          ]),
          transition('* => void', [
            animate('0.3s 0.1s ease-out', style({
              opacity: 0,
              transform: 'translateY(-50%)'
            }))
          ])
        ])
      ]
})

export class MessageInputComponent implements OnInit {

    // represent message loaded into input field
    // default undefined 
    message: Message;
    // show input field is initialized as false
    showPost: boolean = false;
    // location alert is initialized as false
    locationAlert: boolean = false;
    // used to show image on editing - src field
    url: any = '';
    // used to store uploaded file name
    selectedFile: string;
    // used to store edited message index
    index: number;
    //image: HTMLImageElement; 
    // used to store date of post
    date: string;
    // used to store location of user when posting message
    latitude: any;
    longitude: any;

    //locationReady: String; *** dont need anymore ***



    //able to pass this instance to message input component when created
    constructor(/*private route: ActivatedRoute,*/ private messageService: MessageService, private http: Http, private el: ElementRef) {



    }

    // on submitting a post anchors user to page location of the message
    onAnchorClick() {
        console.log(this.index);

        // if index exists for message - find anchor element and scroll user to that location
        // offset by 600
        if (this.index) {

            let post = document.querySelector('#m' + this.index.toString());
            var headerOffset = 600;
            var elementTop = post.getBoundingClientRect().top - headerOffset;

            // if post exist - scroll to
            if (post) {
                window.scrollTo({
                    top: elementTop,
                    behavior: "smooth",
                });
                this.index = null;
            }
        }
    }

    // on file upload - pass event and handle upload
    onFileChanged(event) {

        // store filename
        this.selectedFile = event.target.files[0].name;
        console.log(this.selectedFile);

        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            // read file as data url
            reader.readAsDataURL(event.target.files[0]); 

            // called once readAsDataURL is completed
            reader.onload = (event: any) => { 
                this.url = event.target.result;
            }
        }
    }

    // on form submission - accept form of type NGForm
    onSubmit(form: NgForm) {

        // reset location alert to false
        this.locationAlert = false;

        // if message is not null or undefined - perform edit update function
        if (this.message) {


            // set message content to the content of form value
            this.message.content = form.value.content;
            // set message photo to newly uploaded file
            this.message.photo = this.selectedFile;

            // call message service and pass update message to updateMessage service
            this.messageService.updateMessage(this.message)
                .subscribe(
                result => console.log(result)
                );

            // set message to null to clear input content
            this.message = null;

        // if message null - create message
        } else {

            // create the new message to add
            // pass property content and values of the form created
            const message = new Message(form.value.content, 'Chris', this.selectedFile, '', '', [], this.date, this.latitude, this.longitude);
            
            // access Message Service and pass the value - message based on value
            // store in message array in Service
            // subscribe to the observable in message service
            // callback - log data or error
            this.messageService.addMessage(message)
                .subscribe(
                data => console.log(data),
                error => console.log(error)
                );

        }

        // reset preview img src after submission
        this.url = '';
        // close message input form
        this.showPost = false;
        // reset and clear form
        form.resetForm();



    }

    // clear input - pass input form
    // Clear does not mean deleting original message
    // rather user decided to clear out that data and post a new message
    onClear(form: NgForm) {

        // set message to null to clear input content
        this.message = null;
        this.url = '';
        form.resetForm();
    }

    // the function which handles the file upload 
    upload() {

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token') : '';

        const URL = 'http://localhost:3000/message/image' + token;


        /*
        * Referenced for angular image upload
        * https://scotch.io/tutorials/angular-file-uploads-with-an-express-backend
        * Ogundipe Samuel Ayo
        */

        // locate file element meant for the file upload
        let inputElement: HTMLInputElement = this.el.nativeElement.querySelector('#photo');

        // get the total amount of files attached to the file input - will always be one
        let fileCount: number = inputElement.files.length;

        // create new formdata instance
        let formData = new FormData();

        // check if the filecount is greater than zero 
        if (fileCount > 0) { // a file was selected

            // append the key name photo with file in element
            formData.append('photo', inputElement.files.item(0));

            // call the angular http method - message/image to handle 
            // creating a directory for user images or adding to existing user directory
            this.http
                // post the form data to the url defined above and map the response 
                .post(URL, formData).map((res: Response) => res.json()).subscribe(
                //map the success function and alert response
                (success) => {
                    alert(success._body);
                },
                (error) => alert(error))
        }
    }



    // call message service edit message
    // call message service get index 
    // call message service show post
    ngOnInit() {

        // if edited message emitted
        this.messageService.editedMessage.subscribe(

            // load message into input field 
            // both content and photo preview
            (message: Message) => {
                this.message = message;
                this.selectedFile = message.photo;

                // use for photo preview
                const userId = localStorage.getItem('userId');

                // build url for preview
                const URL = '/images/' + userId;

                // append photo file to src path
                this.url = URL + '/' + message.photo;
            }


        );

        // retrieve index
        this.messageService.gettingIndex.subscribe(

            // set index for edited message or null
            (index: number) => this.index = index

        );

        this.messageService.showingMessage.subscribe(
            (showPost: boolean) => this.showPost = showPost
        );

        //retrieve, format and set date for post
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var minutes = date.getMinutes();
        var hours = date.getHours();
        var currentDate = (monthIndex + 1) + "/" + day + "/" + year + " - " + hours + ":" + minutes;
        this.date = currentDate;


    }

    // get the location for the user posting and set latitude and longitude
    getLocation() {
        if ("geolocation" in navigator) {
            console.log('getting geolocation');
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                console.log(this.latitude);
                console.log(this.longitude);
                // alert user when location is ready
                this.locationAlert = true;
                //this.locationReady = "Your location is ready!" *** dont need anymore ***

            });
        }
    }
}
