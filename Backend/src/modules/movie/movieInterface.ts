export interface IMovie{
    _id?:string;
    title:string;
    description:string;
    duration:number;
    genre:string[];
    releaseDate:Date;
    languages:string[];
    certification:string;
    posterUrl:{public_id:string,secure_url:string};
    rating:number,
    votes:number,
    format?:string[];
}