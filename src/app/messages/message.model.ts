// define how message looks like
// blueprint so messages are the same
export class Message {
    content: string;
    username: string;
    photo: any;

    //optional with ?
    messageId?: string;
    userId?: string;

    //comment section
    comments?: any[];
    date?: string;
    // geotagging post
    latitude?: any;
    longitude?: any;

    // initialize with constructor
    constructor(
        content: string, 
        username: string, 
        photo: any, 
        messageId?: string, 
        userId?: string, 
        comments?: any[], 
        date?: string, 
        latitude?: any, 
        longitude?: any) {

        this.content = content;
        this.username = username;
        this.photo = photo;
        this.messageId = messageId;
        this.userId = userId;
        this.comments = comments;
        this.date = date;
        this.longitude = longitude;
        this.latitude = latitude;

    }
}