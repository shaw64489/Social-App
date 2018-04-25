/*** create footer section ***/

import { Component } from "@angular/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

    //set name variable
    name: string;

    constructor() {
        this.name = "Shaw";
    }

}
