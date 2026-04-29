export interface IUser{
    _id?:string,
    email:string,
    phone:number,
    name:string,
    role:'Admin'|'User',
    activateUser?:boolean;
    createdAt:Date;
    udpatedAt:Date;
}