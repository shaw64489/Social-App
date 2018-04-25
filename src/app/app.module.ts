/******* tell angular what the application consist of ********/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

/******* Import Components ********/

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { routing } from './app.routing';
import { LogoutComponent } from './auth/logout.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
import { FooterComponent } from './footer/footer.component';
import { EntryCommentFormComponent } from './entries/entry/entry-comment-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { SuccessComponent } from './success/success.component';
import { SuccessService } from './success/success.service';
import { MapComponent } from './map/map.component';


// pass args to the decorator
@NgModule({
    // make app aware of components
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        ErrorComponent,
        FooterComponent,
        EntryCommentFormComponent,
        ProfileComponent,
        SuccessComponent,
        HomepageComponent,
        MapComponent
    ],
    // import all basic things needed for application
    // forms module - allows to use ngmodule
    // routing is our custom routing component - app.routing
    // for reactive forms signup - ReactiveFormsModule
    // http module
    // agm core module - angular google maps
    imports: [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyD3Yom46xXg4sU2409Mo_HsNBRAAKeoerU",
            libraries: ["places"]
        }),
        BrowserModule, 
        BrowserAnimationsModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    // make auth, error, and success services available application wide
    providers: [SuccessService, AuthService, ErrorService],

    // root component
    // responsible for holding the application
    bootstrap: [AppComponent]
})
export class AppModule {

}