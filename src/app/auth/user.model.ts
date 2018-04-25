// define how user looks like
// blueprint for users
export class User {
    
    constructor(public email: string, 
                public password: string,
                
                //optional with ?
                public firstName?: string,
                public lastName?: string) {

    }
}