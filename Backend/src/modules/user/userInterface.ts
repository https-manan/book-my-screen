export interface IUser{
    _id?:string,
    name:string,
    email:string,
    phone:number,
    role:'Admin'|'User',
    activateUser?:boolean;
    createdAt:Date;
    udpatedAt:Date;
}