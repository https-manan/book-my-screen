export interface IUser{
    _id?:string,
    email:string,
    name:string,
    phone:number,
    role:'Admin'|'User',
    activateUser?:boolean;
    createdAt:Date;
    udpatedAt:Date;
}