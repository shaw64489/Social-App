// import router components
import { Routes, RouterModule } from "@angular/router";

// import components used in routing
import { MessagesComponent } from "./messages/messages.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { LogoutComponent } from "./auth/logout.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { ProfileComponent } from "./profile/profile.component";
import { MapComponent } from "./map/map.component";



// create constant - array of application routes
// each route is represented by JS object
// each route has a path and related component
const APP_ROUTES: Routes = [

    // home route to load home component
    { path: '', component: HomepageComponent },
    // messeges route to load messages component
    { path: 'messege', component: MessagesComponent },
    // profile:id route to load profile by user ID component
    { path: 'profiles/:id', component: ProfileComponent },
    // maps route to load map component
    { path: 'maps', component: MapComponent},
    // signup route to load signup component
    { path: 'signup', component: SignupComponent},
    // signin route to load signin component
    { path: 'signin', component: SigninComponent},
    // logout route to load logout component
    { path: 'logout', component: LogoutComponent },
    // redirect all other incorrect paths to the homepage
    { path: '**', redirectTo: '' }
    
];

// make angular aware of the routes
// registers our routes
// export so we can use in app module
export const routing = RouterModule.forRoot(APP_ROUTES);