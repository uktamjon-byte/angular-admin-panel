export class IUser {
    constructor(
        public email: string,
        public password: string,
        public name: string,
        public id?: number
    ){
    }
}