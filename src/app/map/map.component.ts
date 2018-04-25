/*** handle the map page to show locations of posts ***/

/*
* Referenced Brian Love post for using MapsAPILoader
* Brian Love
* http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/
*/

import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Message } from "../messages/message.model";
import { MessageService } from "../messages/message.service";
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  /* DONT NEED ANYMORE
  @ViewChild("search")
  public searchElementRef: ElementRef;
  */ 

  // new message array object using message model - array of messages
  // messages used to loop through and set markers for lat and long of each post
  messages: Message[];

  // zoom, latitude and longitude 
  public zoom: number;
  public latitude: number;
  public longitude: number;

  // public searchControl: FormControl; *** DONT NEED ANYMORE

  // inject message service, mapsAPILoader and ngZone
  constructor(
    private messageService: MessageService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  // get all messages from message service on init
  // messages used to loop through and set markers for lat and long of each post
  // set location and zoom for map
  ngOnInit() {

    this.messageService.getMessages()
      .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      });


    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    
    
  }

}
